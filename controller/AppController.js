#!/usr/bin/node
import { randomFactoryLocation, isWithinUS } from '../utils/location.js';

export class AppController {
  static routeMeta = {
    getStatus: {
      path: '/status',
      method: 'GET',
      description: 'Check if the drone system is alive.'
    },
    getBattery: {
      path: '/battery',
      method: 'GET',
      description: 'Retrieve the current battery information.'
    },
    getTarget: {
      path: '/target',
      method: 'GET',
      description: 'Fetch the current assigned target(s) for the drone.'
    },
    postTarget: {
      path: '/target',
      method: 'POST',
      description: 'Assign a new target to the drone.'
    },
    getPanic: {
      path: '/panic',
      method: 'GET',
      description: 'Temporary endpoint for triggering panic mode (self-destruct).'
    },
    postPanic: {
      path: '/panic',
      method: 'POST',
      description: 'Activate panic mode (self-destruct) with POST (requires authorization).'
    },
    newBird: {
      path: '/bird',
      method: 'POST',
      description: 'Build a new default bird and release it into the world.'
    },
    freeBird: {
      path: '/free',
      method: 'GET',
      description: 'Free a single bird? No. Free Bird solo by Lynyrd Skynyrd.'
    },
    freeBird2: {
      path: '/free-bird',
      method: 'GET',
      description: 'Free a single bird? No. Free Bird solo by Lynyrd Skynyrd.'
    },
    getMission: {
      path: '/mission',
      method: 'GET',
      description: 'Retrieve current mission details for the drone.'
    },
    postMission: {
      path: '/mission',
      method: 'POST',
      description: 'Assign a new mission to the drone.'
    },
    getEndpoints: {
      path: '/endpoints',
      method: 'GET',
      description: 'List all available API endpoints, methods, and descriptions.'
    }
  };

  static freeBird(req, res) {
    // Redirect user to Free Bird solo remix
    res.redirect(302, 'https://www.youtube.com/watch?v=YawLAGMWHTo');
  }

  static getStatus(req, res) {
    // TODO: Make this sometimes return false based on MongoDB
    res.status(200).send({ "BIRD": true });
  }

  static getBattery(req, res) {
    // TODO: Make this return data from MongoDB
    //  Ideas:
    //  * Make battery level go down based on time since last request
    //  * If battery gets below a certain point*, charging = true
    //  * *: That certain point is determined with a slightly random variance each time the bird finishes charging and is then stored in MongoDB until next time.
    //  * If charging = true, battery level goes up based on time since it started charging
    //  * Each request has a chance at bringing down the battery level by 1%
    res.status(200).send({ "Battery Level": 80, "Charging": false });
  }

  static getTarget(req, res) {
    // TODO: Implement target retrieval logic
    res.status(501).send("Not Implemented");
  }

  static postTarget(req, res) {
    // TODO: Implement target setting logic
    res.status(501).send("Not Implemented");
  }

  static getPanic(req, res, next) {
    const err = new Error('Forbidden');
    err.status = 403;
    next(err);
  }

  static postPanic(req, res, next) {
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

  static newBird(req, res) {
    // TODO: Implement creating new bird logic
    res.status(501).send("Not Implemented");
  }

  static postMission(req, res) {
    // TODO: Implement mission creation logic
    res.status(501).send("Not Implemented");
  }

  static getMission(req, res) {
    // TODO: Implement mission detail get logic
    res.status(501).send("Not Implemented");
  }
}



export default AppController;
