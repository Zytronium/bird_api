#!/usr/bin/node
import express from "express";
import AppController from "../controller/AppController.js";

const router = express.Router();

/* ----------------------- BIRDS ---------------------- */

router.get('/status', AppController.getStatus);     // GET  /status  - Get drone status
router.get('/battery', AppController.getBattery);   // GET  /battery - Get drone battery information
router.get('/target', AppController.getTarget);     // GET  /target  - Get current target(s)
router.post('/target', AppController.postTarget);   // POST /target  - Add a new target
router.get('/panic', AppController.getPanic);       // GET  /panic   - Self-destruct activation GUI (requires authorization)
router.post('/panic', AppController.postPanic);     // POST /panic   - Activate self-destruct (requires authorization)
router.get('/mission', AppController.getMission);   // GET  /mission - Retrieve mission details
router.post('/mission', AppController.postMission); // POST /mission - Assign a new mission
router.post('/bird', AppController.newBird);        // POST /bird    - Build a new default bird and release it into the world

/* ------------------------ MISC ----------------------- */

router.get('/free', AppController.freeBird);        // GET /free      - Free a single bird? No. Free Bird solo by Lynyrd Skynyrd.
router.get('/free-bird', AppController.freeBird);   // GET /free-bird - Free a single bird? No. Free Bird solo by Lynyrd Skynyrd.
router.get('/endpoints', (req, res) => AppController.getEndpoints(req, res, router)); // GET /endpoints - List all API endpoints

export default router;
