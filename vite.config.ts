import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    {
      name: 'orders-api',
      configureServer(server) {
        // Handle orders file updates
        server.middlewares.use('/api/update-orders', (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const { content } = JSON.parse(body);
                const ordersPath = path.resolve(__dirname, 'public/orders.txt');
                
                // Write the updated content to the file
                fs.writeFileSync(ordersPath, content, 'utf8');
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
              } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to update orders file' }));
              }
            });
          } else {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Method not allowed' }));
          }
        });

        // Handle Telegram API proxy
        server.middlewares.use('/api/telegram', (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', async () => {
              try {
                const { message, botToken, chatId } = JSON.parse(body);
                
                const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML'
                  })
                });

                const result = await telegramResponse.json();
                
                if (telegramResponse.ok) {
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, result }));
                } else {
                  res.writeHead(telegramResponse.status, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Telegram API error', details: result }));
                }
                             } catch (error) {
                 res.writeHead(500, { 'Content-Type': 'application/json' });
                 res.end(JSON.stringify({ 
                   error: 'Failed to send Telegram message', 
                   details: error instanceof Error ? error.message : 'Unknown error'
                 }));
               }
            });
          } else {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Method not allowed' }));
          }
        });
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
