#!/usr/bin/node
import express from "express";
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const elapsed = Date.now() - start;
    console.log(`${req.ip} ${req.method} ${req.originalUrl} => ${res.statusCode} (${elapsed}ms)`);
  });
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes under /api
app.use('/api', routes);

// Error Handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errorPagePath = path.join(__dirname, 'public', 'errors', `${status}.html`);

  if (status >= 500) {
    console.error(`Error on ${req.method} ${req.originalUrl}`);
    console.error(err.stack);
  }

  res.status(status).sendFile(errorPagePath, sendFileErr => {
    if (sendFileErr) {
      res.type('txt').send(`${status} Error`);
    }
  });
});

// Start Server
app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
