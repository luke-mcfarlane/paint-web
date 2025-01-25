import { state } from '../state';
import { drawFromServer } from './drawing';

export const setupWebSocket = () => {
    state.ws.onopen = () => state.ws.send(JSON.stringify({ type: "requestState" }));

    state.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (Array.isArray(data)) {
            for (const action of data) drawFromServer(action);
        } else drawFromServer(data);
    };

    state.ws.onerror = (error) => console.error('WebSocket error:', error);

    state.ws.onclose = () => setTimeout(() => {
            state.ws = new WebSocket('ws://localhost:8081');
            setupWebSocket();
        }, 3000);
}