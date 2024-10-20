import { generateColors } from "./color_generator.js";

const canvas = document.querySelector("canvas");
const colors = document.querySelector(".colors");

const aspect_ratio = 4 / 3;

const generatedColors = generateColors();
let colorHTML = "";
for (let i = 0; i < generatedColors.length; i++) {
  colorHTML += `<div class="color" style="background-color: ${generatedColors[i]};"></div>`;
}
colors.innerHTML = colorHTML;

export { canvas, aspect_ratio };
