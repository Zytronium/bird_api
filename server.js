#!/usr/bin/node
import express from "express";
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const elapsed = Date.now() - start;
    console.log(`${req.ip} ${req.method} ${req.originalUrl} => ${res.statusCode} (${elapsed}ms)`);
  });

  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// Error handling middleware (must come after all routes)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errorPagePath = path.join(__dirname, 'public', 'errors', `${status}.html`);

  if (status >= 500)
    console.error(err.stack);

  res.status(status);
  res.sendFile(errorPagePath, sendFileErr => {
    if (sendFileErr) {
      // Fallback plain text response if error page not found
      res.type('txt').send(`${status} Error`);
    }
  });
});

app.listen(port, host, () => {
  console.log(
    `Server running on port ${port}.\n` +
    `Connect at ${host}:${port}`
  );
});
