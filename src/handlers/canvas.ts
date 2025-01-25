import { state } from "../state";
import { drawAction } from "./drawing";
import { CANVAS_SIZE } from "../types";

export const initializeCanvas = () => {
  state.canvas = document.getElementById("canvas") as HTMLCanvasElement;
  state.ctx = state.canvas.getContext("2d")!;
  state.tempCtx = state.tempCanvas.getContext("2d")!;

  // Calculate scale for display size
  const containerWidth = window.innerWidth - 40;
  const containerHeight = window.innerHeight - 40;
  const scale = Math.min(
    containerWidth / CANVAS_SIZE.width,
    containerHeight / CANVAS_SIZE.height
  );
  const displayWidth = Math.floor(CANVAS_SIZE.width * scale);
  const displayHeight = Math.floor(CANVAS_SIZE.height * scale);

  // Set display size through CSS
  state.canvas.style.width = `${displayWidth}px`;
  state.canvas.style.height = `${displayHeight}px`;
  state.tempCanvas.style.width = `${displayWidth}px`;
  state.tempCanvas.style.height = `${displayHeight}px`;

  // Set actual canvas size to fixed dimensions
  state.canvas.width = CANVAS_SIZE.width;
  state.canvas.height = CANVAS_SIZE.height;
  state.tempCanvas.width = CANVAS_SIZE.width;
  state.tempCanvas.height = CANVAS_SIZE.height;

  // Fill with white background
  state.ctx.fillStyle = "white";
  state.ctx.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
};

export const handleResize = () => {
  if (!state.canvas || !state.ctx || !state.tempCtx) return;

  // Store current content
  const content = state.ctx.getImageData(
    0,
    0,
    CANVAS_SIZE.width,
    CANVAS_SIZE.height
  );

  // Calculate new display size
  const containerWidth = window.innerWidth - 40;
  const containerHeight = window.innerHeight - 40;
  const scale = Math.min(
    containerWidth / CANVAS_SIZE.width,
    containerHeight / CANVAS_SIZE.height
  );
  const displayWidth = Math.floor(CANVAS_SIZE.width * scale);
  const displayHeight = Math.floor(CANVAS_SIZE.height * scale);

  // Update display size
  state.canvas.style.width = `${displayWidth}px`;
  state.canvas.style.height = `${displayHeight}px`;
  state.tempCanvas.style.width = `${displayWidth}px`;
  state.tempCanvas.style.height = `${displayHeight}px`;

  // Restore content
  state.ctx.putImageData(content, 0, 0);
  state.tempCtx.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);
  state.tempCtx.drawImage(state.canvas, 0, 0);
};

export const setupEventListeners = () => {
  if (!state.canvas) return;

  state.canvas.addEventListener("mousedown", startDrawing);
  state.canvas.addEventListener("mousemove", draw);
  state.canvas.addEventListener("mouseup", stopDrawing);
  state.canvas.addEventListener("mouseout", stopDrawing);
};

export function startDrawing(e: MouseEvent) {
  if (!state.canvas) return;

  state.isDrawing = true;
  const rect = state.canvas.getBoundingClientRect();
  const scaleX = state.canvas.width / rect.width;
  const scaleY = state.canvas.height / rect.height;

  state.lastPoint = {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
  state.tempCtx?.clearRect(0, 0, state.canvas.width, state.canvas.height);
  state.tempCtx?.drawImage(state.canvas, 0, 0);
}

export const stopDrawing = () => {
  if (!state.canvas || !state.tempCtx) return;

  if (state.isDrawing) {
    state.tempCtx.clearRect(0, 0, state.canvas.width, state.canvas.height);
    state.tempCtx.drawImage(state.canvas, 0, 0);
  }
  state.isDrawing = false;
  state.lastPoint = null;
};

export const draw = (e: MouseEvent) => {
  if (!state.isDrawing || !state.lastPoint || !state.canvas || !state.ctx)
    return;

  const rect = state.canvas.getBoundingClientRect();
  const scaleX = state.canvas.width / rect.width;
  const scaleY = state.canvas.height / rect.height;

  const currentPoint = {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };

  drawAction(state.lastPoint, currentPoint);

  if (state.currentTool === "pencil") {
    state.lastPoint = currentPoint;
  }
};
