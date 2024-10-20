function generateColors() {
  const colors = [];

  // Step 1: Generate a gradient from black to white
  for (let i = 0; i < 18; i++) {
    const gray = Math.floor((i / 17) * 255); // Gradient from 0 to 255
    const color = `rgb(${gray}, ${gray}, ${gray})`;
    colors.push(color);
  }

  // Step 2: Generate other colors (hue-based)
  for (let i = 0; i < 18; i++) {
    const hue = Math.floor((i / 18) * 360); // Vary hue from 0 to 360
    const saturation = 80; // Fixed saturation (can be varied)
    const lightness = 50; // Fixed lightness (can be varied)
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    colors.push(color);
  }

  return colors;
}

export { generateColors };
