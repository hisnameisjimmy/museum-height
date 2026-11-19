import { createServer } from 'node:http';
import site from './_data/site.json' with { type: 'json' };
import { handleLayoutRequest } from './worker.mjs';

const origin = new URL(site.url).origin;

createServer(async (request, response) => {
    try {
        const url = new URL(request.url, origin);
        if (url.origin !== origin || url.pathname !== '/api/layout') {
            response.writeHead(404).end();
            return;
        }

        const result = handleLayoutRequest(url, request.method);
        const body = await result.text();
        response.writeHead(result.status, Object.fromEntries(result.headers)).end(body);
    } catch (error) {
        console.error('Layout request failed', error);
        response.writeHead(500, {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
        }).end(JSON.stringify({ error: 'Could not calculate the layout.' }));
    }
}).listen(3000);
