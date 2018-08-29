// Creating map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);
// An array containing each city's name, location, and population

function markerSize(population) {
  return population / 40;
}

var cities = [
  {
    location: [40.7128, -74.0059],
    name: "New York",
    population: 8550405
  },
  {
    location: [41.8781, -87.6298],
    name: "Chicago",
    population: 2720546
  },
  {
    location: [29.7604, -95.3698],
    name: "Houston",
    population: 2296224
  },
  {
    location: [34.0522, -118.2437],
    name: "Los Angeles",
    population: 3971883
  },
  {
    location: [41.2524, -95.9980],
    name: "Omaha",
    population: 446599
  }
];

function addCommas(n){
  let n = parseFloat(n).toFixed()
  return Number(n).toLocaleString('en')
}

// Loop through the cities array and create one marker for each city, bind a popup containing its name and population and add it to the map
for (var i = 0; i < cities.length; i++) {
  var city = cities[i];
  L.marker(city.location, {
    draggable: true
  })
    .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>Population " + city.population + "</h3>")
    .addTo(myMap);
}


for (var i = 0; i < cities.length; i++) {
  L.circle(cities[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: "purple",
    radius: markerSize(cities[i].population),
  }).bindPopup(`<h1> ${cities[i].name}</h1><hr><h3>Population: ${cities[i].population}</h3>`).addTo(myMap);
}