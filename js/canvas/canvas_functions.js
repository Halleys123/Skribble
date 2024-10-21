import {
  applyTransform,
  getTransformedPoint,
  drawSmoothLine,
} from "./transformations.js";
import { canvas, ctx, properties, tools, strokes } from "./shared.js";
let currentStroke = null;

const pan = document.querySelector(".pan");
const brush = document.querySelector(".brush");

const aspect_ratio = 4 / 3;

function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientWidth / aspect_ratio;
  redraw();
}

function redraw() {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  applyTransform();
  strokes.forEach((stroke) => {
    drawSmoothLine(stroke.points, stroke.color, stroke.brush_size);
  });
}

function mouse_down(e) {
  const point = getTransformedPoint(e.offsetX, e.offsetY);
  if (e.button == 1) {
    tools.pan = true;
    tools.brush = false;
    pan.classList.add("active");
    brush.classList.remove("active");
  } else if (e.button == 0) {
    tools.pan = false;
    tools.brush = true;
    pan.classList.remove("active");
    brush.classList.add("active");
  }
  if (tools.brush) {
    currentStroke = {
      points: [point],
      color: properties.color,
      brush_size: properties.brush_size,
    };
    strokes.push(currentStroke);
  } else if (tools.pan) {
    properties.clicked = true;
    properties.last_x = e.clientX;
    properties.last_y = e.clientY;
  }
  redraw();
}

function mouse_up() {
  currentStroke = null;
  properties.clicked = false;
}

function mouse_move(e) {
  const point = getTransformedPoint(e.offsetX, e.offsetY);
  if (currentStroke) {
    currentStroke.points.push(point);
    drawSmoothLine(
      currentStroke.points,
      currentStroke.color,
      currentStroke.brush_size
    );
  } else if (properties.clicked) {
    const dx = e.clientX - properties.last_x;
    const dy = e.clientY - properties.last_y;
    properties.offset_x += dx;
    properties.offset_y += dy;
    properties.last_x = e.clientX;
    properties.last_y = e.clientY;
    redraw();
  }
}

export { resizeCanvas, mouse_down, mouse_up, mouse_move, redraw };
