import { canvas, ctx, properties } from "./shared.js";
import { redraw } from "./canvas_functions.js";

const zoom_div = document.querySelector(".zoom > span");

function applyTransform() {
  ctx.setTransform(
    properties.zoom,
    0,
    0,
    properties.zoom,
    properties.offset_x,
    properties.offset_y
  );
}

function getTransformedPoint(x, y) {
  const inverseZoom = 1 / properties.zoom;
  return {
    x: (x - properties.offset_x) * inverseZoom,
    y: (y - properties.offset_y) * inverseZoom,
  };
}
function drawSmoothLine(points, color, brush_size) {
  if (points.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length - 2; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }

  ctx.quadraticCurveTo(
    points[points.length - 2].x,
    points[points.length - 2].y,
    points[points.length - 1].x,
    points[points.length - 1].y
  );

  ctx.strokeStyle = color;
  ctx.lineWidth = brush_size / properties.zoom;
  ctx.stroke();
}
function zoom(e) {
  e.preventDefault();
  const oldZoom = properties.zoom;
  const temp = parseFloat((properties.zoom + e.deltaY * -0.0005).toFixed(2));
  if (temp > 0) {
    properties.zoom = temp;
  }

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  properties.offset_x =
    centerX - (centerX - properties.offset_x) * (properties.zoom / oldZoom);
  properties.offset_y =
    centerY - (centerY - properties.offset_y) * (properties.zoom / oldZoom);

  properties.offset_x += 1;
  properties.offset_y += 1;
  zoom_div.innerHTML = properties.zoom;
  redraw();
}

export { applyTransform, getTransformedPoint, drawSmoothLine, zoom };
