import Bird from "../models/Bird.js";
import { randomFactoryLocation } from "./location.js";

export async function createDefaultBird(overrides = {}) {
  const { lat, lng } = randomFactoryLocation();

  const birdData = {
    battery: {
      level: 100,
      charging: false,
    },
    status: "online",
    destination: {
      lat,
      lng,
      reached: true,
    },
    location: {
      lat,
      lng,
    },
    velocity: 0,
    targets: [],
    mode: {
      mode: "standby",
      since: new Date(),
    },
    mission: {
      name: "Act Normal",
      type: "n/a",
      targets: [],
    },
    logs: [{
      timestamp: new Date(),
      event: "Bird created and deployed.",
    }],
    ...overrides  // Allow any overrides to be passed in
  };

  const bird = new Bird(birdData);
  return bird.save();
}
