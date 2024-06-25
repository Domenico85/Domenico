const imgLoad = (url) =>
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.responseType = "blob";
    request.onload = () => {
      if (request.status === 200) {
        resolve(request.response);
      } else {
        reject(
          Error(
            `Image didn't load successfully [Error Code: ${request.status}] `
          )
        );
      }
    };
    request.onerror = () => {
      reject(Error("There was a network error"));
    };
    request.send();
  });

const imageContainer = document.querySelector("#image");
const myImage = new Image();

imgLoad("https://images.unsplash.com/photo-1497493292307-31c376b6e479")
  .then((response) => {
    const imageURL = window.URL.createObjectURL(response);
    myImage.src = imageURL;
    imageContainer.appendChild(myImage);
    alert("Image loaded");
  })
  .catch((error) => alert(error));
