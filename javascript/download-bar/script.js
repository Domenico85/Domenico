const fileToDownload = "/javascript/download-bar/wallpapers.zip";

const startDownloadElement = document.querySelector("#start-download");

const downloadProgressElement = document.querySelector(
  ".download-progress-bar__progress"
);

startDownloadElement.addEventListener("click", () => {
  console.log("Download Started");

  fetch(`${fileToDownload}`).then((response) => {
    const reader = response.body.getReader();
    const totalSize = Number(response.headers.get("content-length"));
    let totalSizeDownloaded = 0;

    function readData() {
      return reader.read().then((result) => {
        if (result.value) {
          totalSizeDownloaded += result.value.length;
          const percentage = Math.floor(
            (totalSizeDownloaded / totalSize) * 100
          );

          console.log(`${totalSizeDownloaded}/${totalSize} (${percentage}%)`);

          downloadProgressElement.computedStyleMap.width = `$`;
        }
        if (!result.done) {
          return readData();
        }
      });
    }

    return readData();
  });
});
