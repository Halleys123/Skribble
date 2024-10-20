let properties = {
  zoom: 1,
  offset_x: 0,
  offset_y: 0,
  brush_size: 3,
  color: "#000000",
  clicked: false,
};

let tools = {
  brush: true,
  pan: false,
};

const strokes = [];

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

export { properties, tools, canvas, ctx, strokes };
