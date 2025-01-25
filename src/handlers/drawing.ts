import { state } from '../state';
import { Point } from '../types';

export function drawAction(startPoint: Point, endPoint: Point) {
    if (!state.ctx || !state.canvas) return;

    const action = {
        tool: state.currentTool,
        color: state.currentColor,
        line_width: state.currentLineWidth,
        start_x: startPoint.x,
        start_y: startPoint.y,
        end_x: endPoint.x,
        end_y: endPoint.y
    };

    state.ws.send(JSON.stringify(action));

    state.ctx.strokeStyle = state.currentColor;
    state.ctx.lineWidth = state.currentLineWidth;
    state.ctx.lineCap = 'round';

    state.ctx.beginPath();
    state.ctx.moveTo(startPoint.x, startPoint.y);
    state.ctx.lineTo(endPoint.x, endPoint.y);
    state.ctx.stroke();
}

export function drawFromServer(action: any) {
    if (!state.ctx) return;

    const startPoint = { x: action.start_x, y: action.start_y };
    const endPoint = { x: action.end_x, y: action.end_y };

    state.ctx.strokeStyle = action.color;
    state.ctx.lineWidth = action.line_width;
    state.ctx.lineCap = 'round';

    state.ctx.beginPath();
    state.ctx.moveTo(startPoint.x, startPoint.y);
    state.ctx.lineTo(endPoint.x, endPoint.y);
    state.ctx.stroke();
}