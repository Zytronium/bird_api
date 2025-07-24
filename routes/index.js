#!/usr/bin/node
import express from "express";
import AppController from "../controller/AppController.js";

const router = express.Router();

/* ----------------------- BIRDS ---------------------- */

router.get('/bird/:id/status', AppController.getStatus);     // GET  /bird/:id/status  - Get drone status
router.get('/bird/:id/battery', AppController.getBattery);   // GET  /bird/:id/battery - Get drone battery information
router.get('/bird/:id/target', AppController.getTarget);     // GET  /bird/:id/target  - Get current target(s)
router.post('/bird/:id/target', AppController.postTarget);   // POST /bird/:id/target  - Add a new target
router.get('/bird/:id/panic', AppController.getPanic);       // GET  /bird/:id/panic   - Self-destruct activation GUI (requires authorization)
router.post('/bird/:id/panic', AppController.postPanic);     // POST /bird/:id/panic   - Activate self-destruct (requires authorization)
router.get('/bird/:id/mission', AppController.getMission);   // GET  /bird/:id/mission - Retrieve mission details
router.post('/bird/:id/mission', AppController.postMission); // POST /bird/:id/mission - Assign a new mission
router.get('/bird/:id/info', AppController.getBird);         // GET  /bird/:id/info    - Get all the details of a bird
router.post('/bird', AppController.newBird);                 // POST /bird             - Build a new default bird and release it into the world

/* ------------------------ MISC ----------------------- */

router.get('/bird/:id/free', AppController.freeBird);        // GET /bird/:id/free - Free a single bird? No. Free Bird solo by Lynyrd Skynyrd.
router.get('/bird/free', AppController.freeBird);            // GET /bird/free     - Free a single bird? No. Free Bird solo by Lynyrd Skynyrd.
router.get('/free-bird', AppController.freeBird);            // GET /free-bird     - Free a single bird? No. Free Bird solo by Lynyrd Skynyrd.
router.get('/endpoints', (req, res) => AppController.getEndpoints(req, res, router)); // GET /endpoints - List all API endpoints

export default router;
