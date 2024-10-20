import { generateColors } from "./color_generator.js";
import { properties } from "./shared.js";

const colors = document.querySelector(".colors");

function handle_colors() {
  const generatedColors = generateColors();
  let colorHTML = generatedColors
    .map(
      (color) =>
        `<div class="color" style="background-color: ${color};" color = "${color}"></div>`
    )
    .join("");
  colors.innerHTML = colorHTML;
  colors.addEventListener("click", (e) => {
    const target = e.target;
    const color = target.getAttribute("color");
    console.log(target);
    if (color) {
      properties.color = color;
    }
  });
}

export { handle_colors };
