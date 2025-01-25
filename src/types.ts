export interface Point {
    x: number;
    y: number;
}

export type Tool = 'pencil';

export const CANVAS_SIZE = {
    width: 1080,
    height: 1080
} as const;

export interface State {
    ws: WebSocket;
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    tempCanvas: HTMLCanvasElement;
    tempCtx: CanvasRenderingContext2D | null;
    isDrawing: boolean;
    lastPoint: Point | null;
    currentColor: string;
    currentLineWidth: number;
    currentTool: Tool;
}