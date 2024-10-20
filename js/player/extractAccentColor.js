function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) {
    throw new Error("Invalid color component");
  }
  return ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
}

function extractAccentColor(svg_image_string) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Parse the SVG string
    const svg_image = new DOMParser().parseFromString(
      svg_image_string,
      "image/svg+xml"
    );

    // Add a blur filter to the SVG (optional)
    const svgElement = svg_image.querySelector("svg");
    svgElement.insertAdjacentHTML(
      "afterbegin",
      `<filter id="blurMe">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
      </filter>`
    );
    svgElement.setAttribute("filter", "url(#blurMe)");

    // Convert the SVG to a Blob and then to an Object URL
    const svgBlob = new Blob([svg_image.documentElement.outerHTML], {
      type: "image/svg+xml",
    });
    const url = URL.createObjectURL(svgBlob);

    // Create an image element to load the Object URL
    const image = new Image();
    image.onload = function () {
      // Set canvas size to match the SVG image
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0);

      // Get the center pixel color
      const centerX = Math.floor(image.width / 2);
      const centerY = Math.floor(image.height / 2);
      const pixel = ctx.getImageData(centerX, centerY, 1, 1).data;

      // Convert the pixel data to a hex color
      const color = "#" + rgbToHex(pixel[0], pixel[1], pixel[2]);

      // Clean up
      URL.revokeObjectURL(url);
      canvas.remove();

      resolve(color);
    };

    image.onerror = function () {
      reject(new Error("Failed to load SVG image"));
    };

    // Set the image source to the Object URL
    image.src = url;
  });
}

export { extractAccentColor };
