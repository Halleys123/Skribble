import { handle_colors } from "./color_pallete_handler.js";
import {
  resizeCanvas,
  mouse_down,
  mouse_up,
  mouse_move,
  redraw,
} from "./canvas_functions.js";
import { ctx, canvas, tools, strokes, properties } from "./shared.js";
import { zoom } from "./transformations.js";

const brushSizeSlider = document.getElementById("brush-size-slider");
const pan = document.querySelector(".pan");
const brush = document.querySelector(".brush");
const clear = document.querySelector(".clear");
const undo = document.querySelector(".undo");

handle_colors();

ctx.lineCap = "round";
ctx.lineJoin = "round";

function changeBrushSize(e) {
  properties.brush_size = parseInt(e.target.value);
}

pan.addEventListener("click", () => {
  tools.brush = false;
  tools.pan = true;
  pan.classList.add("active");
  brush.classList.remove("active");
});
brush.addEventListener("click", () => {
  tools.brush = true;
  tools.pan = false;
  brush.classList.add("active");
  pan.classList.remove("active");
});
clear.addEventListener("click", () => {
  strokes.length = 0;
  redraw();
});
undo.addEventListener("click", () => {
  strokes.pop();
  redraw();
});

brushSizeSlider.addEventListener("input", changeBrushSize);

canvas.addEventListener("mousedown", mouse_down);
canvas.addEventListener("mouseup", mouse_up);
canvas.addEventListener("mousemove", mouse_move);
canvas.addEventListener("wheel", zoom);

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
