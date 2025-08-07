#!/usr/bin/node
import { randomFactoryLocation, isWithinUS } from '../utils/location.js';
import { createDefaultBird } from "../utils/birdFactory.js";
import { connectDB } from "../config/db.js";
import Bird from "../models/Bird.js";
import { ObjectId } from 'mongodb';
import Simulation from "../utils/simulation.js";

export class AppController {
  static routeMeta = {
    getStatus: {
      path: '/bird/:id/status',
      method: 'GET',
      description: 'Check if the drone system is alive.'
    },
    getBattery: {
      path: '/bird/:id/battery',
      method: 'GET',
      description: 'Retrieve the current battery information.'
    },
    getLocation: {
      path: '/bird/:id/location',
      method: 'GET',
      description: 'Retrieve the coordinates of the bird.'
    },
    getTarget: {
      path: '/bird/:id/target',
      method: 'GET',
      description: 'Fetch the current assigned target(s) for the drone.'
    },
    postTarget: {
      path: '/bird/:id/target',
      method: 'POST',
      description: 'Assign a new target to the drone.'
    },
    getPanic: {
      path: '/bird/:id/panic',
      method: 'GET',
      description: 'Temporary endpoint for triggering panic mode (self-destruct).'
    },
    postPanic: {
      path: '/bird/:id/panic',
      method: 'POST',
      description: 'Activate panic mode (self-destruct) with POST (requires authorization).'
    },
    getBird: {
      path: '/bird/:id/info',
      method: 'GET',
      description: 'Retrieve all details of a bird.'
    },
    newBird: {
      path: '/bird',
      method: 'POST',
      description: 'Build a new default bird and release it into the world.'
    },
    freeBird: {
      path: '/bird/:id/free',
      method: 'GET',
      description: 'Free a single bird? No. Free Bird solo by Lynyrd Skynyrd.'
    },
    freeBird2: {
      path: '/free-bird',
      method: 'GET',
      description: 'Free a single bird? No. Free Bird solo by Lynyrd Skynyrd.'
    },
    getMission: {
      path: '/bird/:id/mission',
      method: 'GET',
      description: 'Retrieve current mission details for the drone.'
    },
    postMission: {
      path: '/bird/:id/mission',
      method: 'POST',
      description: 'Assign a new mission to the drone.'
    },
    getBirds: {
      path: '/birds',
      method: 'GET',
      description: 'Get a list of all birds or retrieve specific data from all birds. Specify which properties to get in request query (coma separated). Use "*" to get all properties.'
    },
    getEndpoints: {
      path: '/endpoints',
      method: 'GET',
      description: 'List all available API endpoints, methods, and descriptions.'
    }
  };

  static async getBirdProperties(birdId, properties) {
    // Check if ID is a valid format
    if (!ObjectId.isValid(birdId)) {
      return { status: 400, send: { error: 'Bad request' } };
    }
    if (!properties || (Array.isArray(properties) && properties.length === 0)) {
      throw new Error('getBirdProperties: must specify at least 1 property');
    }
    if (!Array.isArray(properties)) {
      throw new TypeError('getBirdProperties: properties must be an array');
    }
    // Get bird from MongoDB
    const bird = await Bird.findById(new ObjectId(birdId));
    // Check if bird exists
    if (!bird) {
      return { status: 404, send: { error: 'Not found' } };
    }
    if (properties.length === 1 && properties[0] === '*') {
      return { status: 200, send: bird };
    }
    let response = {};
    // Ensure bird.property exists and get all given values
    let foundProperties = 0;
    properties.forEach(property => {
      if (bird[property] !== undefined) {
        foundProperties ++;
        response[property] = bird[property];
      } else {
        response[property] = null;
      }
    });
    if (foundProperties === 0) {
      return { status: 204, send: { error: 'No content' } };
    }

    // Send the requested information and status code.
    return { status: 200, send: response };
  }

  static async freeBird(req, res) {
    // Update the simulation
    await Simulation.update();

    console.log("FREE THE BIRD!1");

    // Redirect user to Free Bird solo remix
    res.redirect(302, 'https://www.youtube.com/watch?v=YawLAGMWHTo');
  }

  static async getStatus(req, res) {
    const birdId = req.params.id;

    // Update the simulation
    await Simulation.update();

    // Check if ID is a valid format
    if (!ObjectId.isValid(birdId)) {
      return res.status(400).send({ error: 'Bad request' });
    }
    // Get bird from MongoDB
    const bird = await Bird.findById(new ObjectId(birdId));
    // Check if bird exists
    if (!bird) {
      return res.status(404).send({ error: 'Not found' });
    }
    // Ensure bird.status exists
    if (!bird.status) {
      return res.status(204).send({ error: 'No content' });
    }

    // Send the bird's status
    return res.status(200).send({ status: bird.status });
  }

  static async getBattery(req, res) {
    // TODO: Make this return data from MongoDB
    //  Ideas:
    //  * Make battery level go down based on time since last request
    //  * If battery gets below a certain point*, charging = true
    //  * *: That certain point is determined with a slightly random variance each time the bird finishes charging and is then stored in MongoDB until next time.
    //  * If charging = true, battery level goes up based on time since it started charging
    //  * Each request has a chance at bringing down the battery level by 1%
    const birdId = req.params.id;

    // Update the simulation
    await Simulation.update();

    // Check if ID is a valid format
    if (!ObjectId.isValid(birdId)) {
      return res.status(400).send({ error: 'Bad request' });
    }
    // Get bird from MongoDB
    const bird = await Bird.findById(new ObjectId(birdId));
    // Check if bird exists
    if (!bird) {
      return res.status(404).send({ error: 'Not found' });
    }
    // Ensure bird.battery exists
    if (!bird.battery) {
      return res.status(204).send({ error: 'No content' });
    }

    // Send the bird's battery info
    return res.status(200).send({ battery: bird.battery });
  }

  static async getTarget(req, res) {
    // Update the simulation
    await Simulation.update();

    const { status, send: response } = await AppController.getBirdProperties(req.params.id, ['mission', 'targets']);
    return res.status(status).send({ currentTarget: response.targets[0] || "", missionTargets: response.mission.targets });
  }

  static async postTarget(req, res) {
    // TODO: Implement target setting logic
    // Update the simulation
    await Simulation.update();
    res.status(501).send("Not Implemented");
  }

  static async getLocation(req, res) {
    // Update the simulation
    await Simulation.update();

    const { status, send: response } = await AppController.getBirdProperties(req.params.id, ['location']);
    return res.status(status).send(response);
  }

  static async getPanic(req, res, next) {
    // Update the simulation
    await Simulation.update();
    const err = new Error('Forbidden');
    err.status = 403;
    next(err);
  }

  static async postPanic(req, res, next) {
    // Update the simulation
    await Simulation.update();
    const err = new Error('Forbidden');
    err.status = 403;
    next(err);
  }

  static getEndpoints(req, res, router) {
    const routesMap = {};

    router.stack.forEach(layer => {
      if (!layer.route) return;

      const fullPath = `/api${layer.route.path}`;
      const methods = Object.keys(layer.route.methods).map(m => m.toLowerCase());

      if (!routesMap[fullPath]) {
        routesMap[fullPath] = {};
      }

      methods.forEach(method => {
        const meta = Object.values(AppController.routeMeta).find(meta =>
          meta.method.toLowerCase() === method && meta.path === layer.route.path
        );

        routesMap[fullPath][method] = {
          description: meta?.description || 'No description set'
        };
      });
    });

    res.status(200).json(routesMap);
  }

  static async getBird(req, res) {
    // Update the simulation
    await Simulation.update();

    const { status, send: response } = await AppController.getBirdProperties(req.params.id, ['*']);
    return res.status(status).send(response);
  }

  static async getBirds(req, res) {
    // Update the simulation
    await Simulation.update();

    // Get properties from request params
    let { properties } = req.query;

    // Fetch all birds
    const birds = await Bird.find();

    // If no properties specified, return just the list of IDs
    if (!properties || properties.trim() === '') {
      const idsOnly = birds.map(bird => bird._id);
      return res.status(200).send({ ids: idsOnly });
    }

    // Normalize properties into array
    if (typeof properties === 'string') {
      properties = properties.split(',').map(p => p.trim()).filter(p => p.length > 0);
    }

    // Get specific properties per bird
    const response = {};

    for (const bird of birds) {
      const { status, send } = await AppController.getBirdProperties(bird._id, properties);
      if (status === 200) {
        response[bird._id] = send;
      } else {
        response[bird._id] = { error: send.error || "Unknown error" };
      }
    }

    return res.status(200).send(response);
  }

  static async newBird(req, res) {
    // TODO: make this require authorization or extreme rate limits
    // Update the simulation
    await Simulation.update();

    try {
      const overrides = req.body || {};
      const bird = await createDefaultBird(overrides);
      res.status(201).json(bird);
    } catch (err) {
      console.error("Error creating bird:", err);
      res.status(500).json({ error: `Failed to create bird: ${err.message}` });
    }
  }

  static async postMission(req, res) {
    // TODO: Implement mission creation logic
    // Update the simulation
    await Simulation.update();

    res.status(501).send("Not Implemented");
  }

  static async getMission(req, res) {
    // TODO: Implement mission detail get logic
    // Update the simulation
    await Simulation.update();

    res.status(501).send("Not Implemented");
  }
}

export default AppController;
