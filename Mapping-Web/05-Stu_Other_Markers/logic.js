// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map").setView([45.52, -122.67], 13);

// Add a tile layer (the background map image) to our map
// Use the addTo method to add objects to our map
L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}", 
  {
    accessToken: API_KEY
  }
).addTo(myMap);

// Write code here to create a circle using the following coordinates: (45.52, -122.69)
L.circle([45.52, -122.69], {
  color: 'green', 
  fillColor: 'green', 
  fillOpacity: 0.75,
  radius: 500, 
}).addTo(myMap)

// Write code here to create a polygon with the following coordinates:
// (45.54, -122.68), (45.55, -122.68), (45.55, -122.66)
L.polygon([
  [45.54, -122.68],
  [45.55, -122.68],
  [45.55, -122.66],
], {
    color: 'yellow',
    fillColor: 'yellow', 
    fillOpacity: .75
}).addTo(myMap)
// Write code here to create a polyline with the following coordinates:
// (45.51, -122.68), (45.50, -122.60), (45.48, -122.70), (45.54, -122.75)
var line = [
  [45.51, -122.68]
  [45.50, -122.60]
  [45.48, -122.70]
  [45.54, -122.75]
]

L.polyline(line, {
  color: 'red'
}).addTo(myMap)
// Write code here to create a rectangle with the following coordinates:
// (45.55, -122.64) and (45.54, -122.61)
L.rectangle([
  [45.55, -122.64],
  [45.54, -122.61],
], {
  color: 'black',
  weight: 3,
  stroke: true
}).addTo(myMap)