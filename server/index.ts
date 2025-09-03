console.log('[server] Starting...');
import app from './app';
import { serve } from '@hono/node-server';

console.log('[server] Imports successful.');

const PORT = process.env.PORT ? Number(process.env.PORT) : 5175;

console.log(`[server] Attempting to listen on port ${PORT}`);

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  (info) => {
    console.log(`[server] listening on http://localhost:${info.port}`);
  }
);
