#!/usr/bin/node
export class Simulation {
  static async update() {
    console.log("Simulation not implemented yet.");

    // Simulate a "last update" that happened 45 seconds ago
    const mockDB = {
      lastUpdate: new Date(Date.now() - 45 * 1000), // <-- Date object 45 seconds ago
    };

    const now = new Date();
    const lastUpdate = mockDB.lastUpdate;

    // Time since last update in seconds
    const timeSinceLastUpdate = (now.getTime() - lastUpdate.getTime()) / 1000;

    if (timeSinceLastUpdate > 30) {
      console.log(`It's been ${timeSinceLastUpdate} seconds — running simulation update.`);
      // Update timestamp for last update
      // Drain batteries based on velocity, time since last update, current functions, random chance, etc. Charge battery instead if charging.
      // Advance each bird's position towards its destination based on current velocity and time since last update. Ensure new position is in the US.
      // Random chance events (i.e., cover blown, bird goes offline, etc.)
      // Mission-specific programming
    } else {
      console.log(`Only ${timeSinceLastUpdate} seconds since last update — skipping.`);
    }
  }
}


export default Simulation;
