#!/usr/bin/node
export const birdFactories = [
  { lat: 38.9072, lng: -77.0369 },  // Washington, D.C.
  { lat: 27.6928, lng: -97.2754 },  // Corpus Christi, TX
  { lat: 39.2992, lng: -76.6094 },  // Baltimore, MD
  { lat: 41.8781, lng: -87.6298 },  // Chicago, IL
  { lat: 34.0522, lng: -118.2437 }, // Los Angeles, CA
  { lat: 29.7604, lng: -95.3698 },  // Houston, TX
  { lat: 39.7392, lng: -104.9903 }, // Denver, CO
  { lat: 47.6062, lng: -122.3321 }, // Seattle, WA
  { lat: 25.7617, lng: -80.1918 },  // Miami, FL
  { lat: 44.9778, lng: -93.2650 },  // Minneapolis, MN
  { lat: 33.4484, lng: -112.0740 }, // Phoenix, AZ
  { lat: 32.7767, lng: -96.7970 },  // Dallas, TX
  { lat: 40.7128, lng: -74.0060 },  // New York City, NY
  { lat: 35.2271, lng: -80.8431 },  // Charlotte, NC
  { lat: 42.3601, lng: -71.0589 },  // Boston, MA
  { lat: 45.5122, lng: -122.6587 }, // Portland, OR
  { lat: 36.1699, lng: -115.1398 }, // Las Vegas, NV
  { lat: 43.0389, lng: -87.9065 },  // Milwaukee, WI
  { lat: 30.3322, lng: -81.6557 },  // Jacksonville, FL
  { lat: 35.1495, lng: -90.0490 }   // Memphis, TN
];

export function randomFactoryLocation() {
  return birdFactories[Math.floor(Math.random() * birdFactories.length)];
}

export function isWithinUS(lat, lng) {
  return (
    lat >= 24.396308 && lat <= 49.384358 &&
    lng >= -125 && lng <= -66.93457
  );
}
