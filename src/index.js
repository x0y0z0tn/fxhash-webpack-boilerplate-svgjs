/* @license add your license lines here, these will be used by webpack.*/

// these are the variables you can use as inputs to your algorithms
console.log(fxhash); // the 64 chars hex number fed to your algorithm
//console.log(fxrand()); // deterministic PRNG function, use it instead of Math.random()

// note about the fxrand() function
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
//
// window.$fxhashFeatures = {
//   "Background": "Black",
//   "Number of lines": 10,
//   "Inverted": true
// }

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

document.addEventListener("keypress", function (event) {
  if (event.key === "s") {
    downloadPNG();
  }

  if (event.key === "S") {
    downloadSVG();
  }
});

import { SVG } from "@svgdotjs/svg.js";

const width = 297;
const height = 210;

let draw = SVG()
  .addTo("body")
  .size(`${width}mm`, `${height}mm`)
  .viewbox(0, 0, width, height);

draw.rect(width, height).fill("#fbfbf8");

let pattern = draw.pattern(5, 5, function (add) {
  add.line(0, 0, 5, 5).stroke({ color: "#2f2f2f", width: 0.5 });
});

draw
  .polygon("50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40")
  .fill(pattern)
  .stroke({ width: 1, color: "#2f2f2f" })
  .move(100, 20);

fxpreview();
