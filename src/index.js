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

function downloadSVG() {
  const base64doc = btoa(unescape(encodeURIComponent(draw.svg())));

  let href = "data:image/svg+xml;base64," + base64doc;
  let name = getFilename("svg");

  download(href, name);
}

function downloadPNG() {
  let image = new Image();

  const base64doc = btoa(unescape(encodeURIComponent(draw.svg())));
  image.src = "data:image/svg+xml;base64," + base64doc;

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
}

document.addEventListener("keypress", function (event) {
  if (event.key === "s") {
    downloadSVG();
  }

  if (event.key === "S") {
    downloadPNG();
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
