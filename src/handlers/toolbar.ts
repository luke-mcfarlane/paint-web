import { state } from "../state";

const COLORS = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
const MIN_SIZE = 1;
const MAX_SIZE = 50;
const SENSITIVITY = 0.5;

export function setupToolbar() {
  const control = document.getElementById("control") as HTMLElement;
  const preview = document.querySelector(".control-preview") as HTMLElement;

  let currentColorIndex = 0;
  let startY = 0;
  let isDragging = false;
  let initialSize = 0;

  const updateColor = (index: number) => {
    currentColorIndex = (index + COLORS.length) % COLORS.length;
    const color = COLORS[currentColorIndex];
    state.currentColor = color;
    preview.style.setProperty("--current-color", color);
  };

  const updateSize = (startY: number, currentY: number) => {
    const deltaY = startY - currentY;
    const newSize = Math.max(
      MIN_SIZE,
      Math.min(MAX_SIZE, initialSize + deltaY * SENSITIVITY)
    );
    state.currentLineWidth = Math.round(newSize);
    preview.style.setProperty("--current-size", String(state.currentLineWidth));
  };

  control.addEventListener("mousedown", (e: MouseEvent) => {
    isDragging = false;
    startY = e.clientY;
    initialSize = state.currentLineWidth;
  });

  control.addEventListener("mousemove", (e: MouseEvent) => {
    if (e.buttons === 1) {
      isDragging = true;
      updateSize(startY, e.clientY);
    }
  });

  control.addEventListener("click", () => {
    if (!isDragging) {
      updateColor(currentColorIndex + 1);
    }
  });

  control.addEventListener("touchstart", (e: TouchEvent) => {
    startY = e.touches[0].clientY;
    initialSize = state.currentLineWidth;
  });

  control.addEventListener("touchmove", (e: TouchEvent) => {
    e.preventDefault();
    isDragging = true;
    updateSize(startY, e.touches[0].clientY);
  });

  control.addEventListener("touchend", () => {
    if (!isDragging) {
      updateColor(currentColorIndex + 1);
    }
    isDragging = false;
  });

  // Set initial values
  updateColor(0);
  preview.style.setProperty("--current-size", String(state.currentLineWidth));
}
