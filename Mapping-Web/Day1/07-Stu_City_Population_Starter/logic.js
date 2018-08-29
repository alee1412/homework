function addCommas(n){
  var n = parseFloat(n).toFixed()
  return Number(n).toLocaleString('en')
}


// Define a markerSize function that will give each city a different radius based on its population
function markerSize(population) {
  return population / 40;
}

// Creating map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token={accessToken}", {
    accessToken: API_KEY
  }).addTo(myMap);

// An array containing each city's name, location, and population
var cities = [
  {
    location: [40.7128, -74.0059],
    name: "New York",
    population: 8550405,
    color: "red"
  },
  {
    location: [41.8781, -87.6298],
    name: "Chicago",
    population: 2720546,
    color: "green"
  },
  {
    location: [29.7604, -95.3698],
    name: "Houston",
    population: 2296224,
    color: "purple"
  },
  {
    location: [34.0522, -118.2437],
    name: "Los Angeles",
    population: 3971883,
    color: "orange"
  },
  {
    location: [41.2524, -95.9980],
    name: "Omaha",
    population: 446599,
    color: "black"
  }
];

const colors = ["red", "orange", "purple", "black", "green"]


function colorSize(population){
  if(population < 500000){
    return "black"
  }
}

function addCommas(n){
  var n = parseFloat(n).toFixed()
  return Number(n).toLocaleString('en')
}

// Loop through the cities array and create one marker for each city, bind a popup containing its name and population and add it to the map
for (var i = 0; i < cities.length; i++) {
  //var city = cities[i];
  L.circle(cities[i].location, {
    fillOpacity: 0.75,
    color: 'white',
    fillColor: colors[i], // cities[i].color
    radius: markerSize(cities[i].population)
  })
    .bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population " + cities[i].population + "</h3>")
    .addTo(myMap);
}
