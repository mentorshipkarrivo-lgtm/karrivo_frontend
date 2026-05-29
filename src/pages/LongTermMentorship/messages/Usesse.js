

import { useEffect, useRef } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * useSSE — subscribes to a server-sent event stream for a session
 * @param {string|null} sessionId  - active session id (null = disabled)
 * @param {function}    onMessage  - called with parsed message object on new event
 */
export function useSSE(sessionId, onMessage) {
    const onMessageRef = useRef(onMessage);
    onMessageRef.current = onMessage;

    useEffect(() => {
        if (!sessionId) return;

        const token = localStorage.getItem('token');
        // SSE with auth via query param (EventSource doesn't support headers)
        const url = `${BASE_URL}/api/messages/stream/${sessionId}?token=${token}`;
        const es = new EventSource(url);

        es.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data);
                if (data.type === 'NEW_MESSAGE') {
                    onMessageRef.current(data.payload);
                }
            } catch {
                // ignore parse errors (heartbeats etc.)
            }
        };

        es.onerror = () => {
            // EventSource auto-reconnects — no action needed
        };

        return () => es.close();
    }, [sessionId]);
}