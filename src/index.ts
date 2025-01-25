import {
  handleResize,
  initializeCanvas,
  setupEventListeners,
} from "./handlers/canvas";
import { setupToolbar } from "./handlers/toolbar";
import { setupWebSocket } from "./handlers/websocket";

function initialize() {
  initializeCanvas();
  setupWebSocket();
  setupEventListeners();
  setupToolbar();
  window.addEventListener("resize", handleResize);
}

document.addEventListener("DOMContentLoaded", initialize);
