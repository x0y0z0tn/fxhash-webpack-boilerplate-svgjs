function getFilename(ext) {
  return `${fxhash}.${ext}`;
}

function download(href, name) {
  const a = document.createElement("a");
  a.href = href;
  a.download = name;

  const e = new MouseEvent("click");
  a.dispatchEvent(e);
}

function getSVGBlobURL() {
  let clonedSvgElement = document.body.querySelector("svg").cloneNode(true);
  let outerHTML = clonedSvgElement.outerHTML,
    blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
  let URL = window.URL || window.webkitURL || window;
  return URL.createObjectURL(blob);
}

function downloadSVG() {
  download(getSVGBlobURL(), getFilename("svg"));
}

function downloadPNG() {
  let image = new Image();

  image.onload = function () {
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    let name = getFilename("png");
    let href = canvas.toDataURL("image/png");

    download(href, name);
  };

  image.src = getSVGBlobURL();
}

export { downloadSVG, downloadPNG };
