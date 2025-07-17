#!/usr/bin/node
import express from "express";
import * as AppController from "../controller/AppController.js";

const router = express.Router();

/* ---------------------- FRONT END --------------------- */

// GET / - home page. gets all API endpoints and adds links to them
router.get('/', (req, res) => AppController.getHome(req, res, router));

/* ------------------------- API ------------------------ */

// GET /status - gets the status of the drone
router.get('/api/status', AppController.getStatus);

// GET /battery - gets the battery information of the drone
router.get('/api/battery', AppController.getBattery);

// GET /target - gets the current target(s) for the drone
router.get('/api/target', AppController.getTarget);

// POST /target - adds a target for the drone
router.post('/api/target', AppController.postTarget);

// GET /panic - GUI to activate self destruct sequence. Requires authorization
router.get('/api/panic', AppController.getPanic);

// POST /panic - activates self destruct sequence. Requires authorization
router.post('/api/panic', AppController.postPanic);

// GET /endpoints - gets all API endpoints
router.get('/api/endpoints', (req, res) => AppController.getEndpoints(req, res, router));

export default router;
