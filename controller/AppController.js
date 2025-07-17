#!/usr/bin/node
export const getStatus = (req, res) => {
  res.status(200).send({ "BIRD": true });
};

export const getBattery = (req, res) => {
  res.status(200).send({ "Battery Level": 80, "Charging": false });
};

export const getTarget = (req, res) => {
  // todo: get current target for the drone, or none
  res.status(501).send("Not Implemented");
};

export const postTarget = (req, res) => {
  // todo: set a new target for the drone
  res.status(501).send("Not Implemented");
};

export const getPanic = (req, res, next) => {
  const err = new Error('Forbidden');
  err.status = 403;
  next(err);
};

export const postPanic = (req, res, next) => {
  const err = new Error('Forbidden');
  err.status = 403;
  next(err);
};

export const getHome = (req, res, router) => {
  const host = req.get('host'); // e.g. "10.8.220.39:5000" or "localhost:5000"
  const protocol = req.protocol; // "http" or "https"

  let html = '<h1>Available API Endpoints</h1><ul>';

  router.stack.forEach(layer => {
    if (layer.route) {
      const path = layer.route.path;
      const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase());

      methods.forEach(method => {
        if (method === 'GET') {
          const url = `${protocol}://${host}${path}`;
          html += `<li><a href="${url}">${method} ${path}</a></li>`;
        } else {
          html += `<li>${method} ${path}</li>`;
        }
      });
    }
  });

  html += '</ul>';
  res.status(200).send(html);
};

export const getEndpoints = (req, res, router) => {
  const routes = [];

  router.stack.forEach(layer => {
    if (layer.route) {
      const path = layer.route.path;
      const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase());
      routes.push({ path, methods });
    }
  });

  res.status(200).json(routes);
}
