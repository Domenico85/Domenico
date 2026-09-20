const ALLOWED_ORIGINS = new Set([
	"https://domenico85.github.io",
	"https://theloopstudio.org",
	"https://www.theloopstudio.org",
]);

function isAllowedOrigin(origin) {
	if (!origin) return false;
	if (ALLOWED_ORIGINS.has(origin)) return true;
	// Local dev servers (python -m http.server, live-server, ecc.)
	return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function corsHeaders(origin) {
	return {
		"Access-Control-Allow-Origin": origin,
		"Access-Control-Allow-Methods": "GET, OPTIONS",
		"Vary": "Origin",
	};
}

export default {
	async fetch(request, env) {
		const origin = request.headers.get("Origin");
		const originAllowed = isAllowedOrigin(origin);

		if (request.method === "OPTIONS") {
			return new Response(null, {
				status: 204,
				headers: originAllowed ? corsHeaders(origin) : {},
			});
		}

		if (!originAllowed) {
			return new Response("Forbidden", { status: 403 });
		}

		const url = new URL(request.url);
		if (url.pathname !== "/weather" || request.method !== "GET") {
			return new Response("Not found", {
				status: 404,
				headers: corsHeaders(origin),
			});
		}

		const city = url.searchParams.get("q")?.trim();
		if (!city || city.length > 100) {
			return new Response(JSON.stringify({ error: "Missing or invalid 'q' parameter" }), {
				status: 400,
				headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
			});
		}

		const days = Math.min(3, Math.max(1, parseInt(url.searchParams.get("days"), 10) || 3));

		const apiUrl = new URL("https://api.weatherapi.com/v1/forecast.json");
		apiUrl.searchParams.set("key", env.WEATHER_API_KEY);
		apiUrl.searchParams.set("q", city);
		apiUrl.searchParams.set("days", String(days));

		const apiResponse = await fetch(apiUrl);
		const body = await apiResponse.text();

		return new Response(body, {
			status: apiResponse.status,
			headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
		});
	},
};
