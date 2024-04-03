function detectarEnter(event) {
    
    if (event.key === "Enter" && !event.shiftKey) {
        
        event.preventDefault();
        obtenerRespuesta();
    }
}

function obtenerRespuesta() {
    
    var textoUsuario = document.getElementById("inputText").value;

    
    var respuestas = [
        "¡Excelente elección!",
        "Eso suena interesante.",
        "¿Puedes proporcionar más detalles?",
        "No estoy seguro de entender. ¿Puedes explicar más?",
        "¡Gracias por compartir!"
    ];

   
    var respuestaAleatoria = respuestas[Math.floor(Math.random() * respuestas.length)];

    document.getElementById("respuesta").innerText = respuestaAleatoria;
}

