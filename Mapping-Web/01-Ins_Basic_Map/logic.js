// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center: [45.52, -122.67],
  zoom: 13
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
// streets
// light
// dark
// streets-satellite
// wheatpaste
// run-bike-hike
// outdoors
// pirates
// pencil
// emerald
//high-contrast
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
}).addTo(myMap);

var marker = L.marker([45.52, -122.67], {
  draggable: false,
  title: "Center"
}).addTo(myMap);

const data = {label: 'Hi'}

marker.bindPopup(`${data.label}`);

const cities = [{
  location: [40.7128, -74.0059],
  name: "New York",
  population: "8,550,405"
}, {
  location: [41.8781, -87.6298],
  name: "Chicago",
  population: "2,720,546"
}, {
  location: [29.7604, -95.3698],
  name: "Houston",
  population: "3,971,883"
}, {
  location: [41.2524, -95.9980],
  name: "Omaha",
  population: "446,559"
}]

for(let index = 0; index < cities.length; index++) {
  var city = cities[index];
  L.marker(city.location)
  .bindPopup(`<h1>${city.name}</h1> <hr> <h3>Population ${city.population}</h3>`)
  .addTo(myMap);
}