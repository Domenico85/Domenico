const fileToDownload = "/javascript/download-bar/wallpapers.zip";

const startDownloadElement = document.querySelector("#start-download");

const downloadProgressElement = document.querySelector(
  ".download-progress-bar__progress"
);

startDownloadElement.addEventListener("click", () => {
  console.log("Download Started");
  startDownloadElement.setAttribute("disabled", "true");
  const dataChunks = [];

  fetch(`${fileToDownload}`)
    .then((response) => {
      const reader = response.body.getReader();
      const totalSize = Number(response.headers.get("content-length"));
      let totalSizeDownloaded = 0;

      function readData() {
        return reader.read().then((result) => {
          if (result.value) {
            dataChunks.push(result.value);
            totalSizeDownloaded += result.value.length;
            const percentage = Math.floor(
              (totalSizeDownloaded / totalSize) * 100
            );

            console.log(`${totalSizeDownloaded}/${totalSize} (${percentage}%)`);

            downloadProgressElement.textContent = `${percentage}%`;
            downloadProgressElement.style.width = `${percentage}%`;
          }
          if (!result.done) {
            return readData();
          }
        });
      }

      return readData();
    })
    .then(() => {
      console.log("Download finished");
      const downloadAnchor = document.createElement("a");
      const blob = new Blob(dataChunks);
      downloadAnchor.href = URL.createObjectURL(blob);
      downloadAnchor.download = fileToDownload;
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);
    })
    .catch(() => {
      downloadProgressElement.textContent = "Download Error";
      downloadProgressElement.classList.add("error");
    })
    .finally(() => {
      startDownloadElement.removeAttribute("disabled");
    });
});
