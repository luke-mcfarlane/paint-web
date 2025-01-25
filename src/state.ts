import { Tool, Point } from "./types";

export const state = {
  ws: new WebSocket("ws://localhost:8081"),
  canvas: null as HTMLCanvasElement | null,
  ctx: null as CanvasRenderingContext2D | null,
  tempCanvas: document.createElement("canvas"),
  tempCtx: null as CanvasRenderingContext2D | null,
  isDrawing: false,
  lastPoint: null as Point | null,
  currentColor: "#000000",
  currentLineWidth: 2,
  currentTool: "pencil" as Tool,
  isConnected: false,
};
