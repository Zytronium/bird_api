#!/usr/bin/node
import express from "express";
import AppController from "../controller/AppController.js";

const router = express.Router();

/* ------------------------- API Routes ------------------------ */

// GET /status - Get drone status
router.get('/status', AppController.getStatus);

// GET /battery - Get drone battery information
router.get('/battery', AppController.getBattery);

// GET /target - Get current target(s)
router.get('/target', AppController.getTarget);

// POST /target - Add a new target
router.post('/target', AppController.postTarget);

// GET /panic - Self-destruct activation GUI (requires authorization)
router.get('/panic', AppController.getPanic);

// POST /panic - Activate self-destruct (requires authorization)
router.post('/panic', AppController.postPanic);

// GET /endpoints - List all API endpoints
router.get('/endpoints', (req, res) => AppController.getEndpoints(req, res, router));

export default router;
