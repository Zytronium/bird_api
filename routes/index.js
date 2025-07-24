#!/usr/bin/node
import express from "express";
import AppController from "../controller/AppController.js";

const router = express.Router();

/* ----------------------- BIRDS ---------------------- */

router.get('/bird/status', AppController.getStatus);     // GET  /status  - Get drone status
router.get('/bird/battery', AppController.getBattery);   // GET  /battery - Get drone battery information
router.get('/bird/target', AppController.getTarget);     // GET  /target  - Get current target(s)
router.post('/bird/target', AppController.postTarget);   // POST /target  - Add a new target
router.get('/bird/panic', AppController.getPanic);       // GET  /panic   - Self-destruct activation GUI (requires authorization)
router.post('/bird/panic', AppController.postPanic);     // POST /panic   - Activate self-destruct (requires authorization)
router.get('/bird/mission', AppController.getMission);   // GET  /mission - Retrieve mission details
router.post('/bird/mission', AppController.postMission); // POST /mission - Assign a new mission
router.get('/bird', AppController.getBird);              // GET  /bird    - Get all the details of a bird
router.post('/bird', AppController.newBird);             // POST /bird    - Build a new default bird and release it into the world

/* ------------------------ MISC ----------------------- */

router.get('/bird/free', AppController.freeBird);        // GET /free      - Free a single bird? No. Free Bird solo by Lynyrd Skynyrd.
router.get('/free-bird', AppController.freeBird);        // GET /free-bird - Free a single bird? No. Free Bird solo by Lynyrd Skynyrd.
router.get('/endpoints', (req, res) => AppController.getEndpoints(req, res, router)); // GET /endpoints - List all API endpoints

export default router;
