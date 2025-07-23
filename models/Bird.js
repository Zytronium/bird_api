#!/usr/bin/node
import mongoose from "mongoose";

const targetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  reason: { type: String, required: true },
  operation: {
    type: String,
    enum: ['observe', 'track', 'spy', 'eliminate'],
    required: true
  }
  /*
   * operations:
   *  observe: observe the target to look for suspicious activity.
   *  track: track the target's location so they can be located.
   *  spy: spy on the target to find important info.
   *  eliminate: eliminate the target.
   */
}, { _id: false });

const singleConditionSchema = new mongoose.Schema({
  property: { type: String, required: true },  // e.g. "battery.level"
  comparator: {
    type: String,
    enum: ['==', '!=', '>', '>=', '<', '<='],
    required: true
  },
  value: { type: mongoose.Schema.Types.Mixed, required: true }
}, { _id: false });

const conditionGroupSchema = new mongoose.Schema({
  operator: {
    type: String,
    enum: ['AND', 'OR', 'XOR'],
    default: 'AND'
  },
  conditions: { type: [singleConditionSchema], required: true }
}, { _id: false });

const modeSchema = new mongoose.Schema({
  mode: {
    type: String,
    enum: ['active', 'standby', 'recharge', 'inactive', 'panic'],
    required: true
  },
  since: { type: Date, default: Date.now },
  until_time: { type: Date },
  until_condition: conditionGroupSchema
  /*
   * modes:
   *  active: the drone is actively working on a mission.
   *  standby: the drone is awaiting instructions.
   *  recharge: the drone is recharging its power reserves or actively seeking out a charging station.
   *  inactive: the drone is no longer in service and is powered down or gone rouge.
   *  panic: the drone has blown its cover. Self-destruct sequence activated.
   */
}, { _id: false });

const missionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['scan', 'observe', 'track', 'spy', 'eliminate', 'n/a'],
    required: true
  },
  targets: [targetSchema]
  /*
   * types:
   *  scan: scan for potential suspects and threats. No specific target.
   *  observe: observe the target(s) to look for suspicious activity.
   *  track: track the location of the target(s) so they can be located.
   *  spy: spy on the target(s) to find important info.
   *  eliminate: the target(s) has/have been identified as (a) threat(s) to democracy. Eliminate them.
   *  n/a: do nothing / miscellaneous mission. Blend in with other birds.
   */
}, { _id: false });

const birdSchema = new mongoose.Schema({
  battery: {
    level: { type: Number, default: 100 },
    charging: { type: Boolean, default: false },
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'unknown', 'destroyed'],
    default: true
  },
  destination: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    reached: { type: Boolean, default: false }
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  velocity: { type: Number, default: 0 },  // MPH because wtf is a kilometer
  targets: [targetSchema],
  mode: modeSchema,
  mission: missionSchema,
  logs: [
    {
      timestamp: { type: Date, required: true },
      event: { type: String, required: true },
    }
  ]
}, { timestamps: true });

export default mongoose.model("Bird", birdSchema);
