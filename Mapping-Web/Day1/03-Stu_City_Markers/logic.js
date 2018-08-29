// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer to the map
L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}", 
      {
        accessToken: API_KEY
      }
  ).addTo(myMap);

// City markers

// Add code to create a marker for each city below and add it to the map

// newyork;
// chicago;
// houston;
// la;
// omaha;

var cities = [{
  location: [40.7128, -74.0059],
  name: 'New York',
  population: '8,550,405'
},{
  location: [41.8781, -87.6298],
  name: 'Chicago',
  population: '2,720,546'
},{
  location:[29.7604, -95.3698],
  name: 'Houston',
  population: '3,971,883'
},
{
  location: [41.2524, -95.9980],
  name: 'Omaha',
  population:'446,599'
}]



for(let index = 0; index < cities.length; index++){
  var city = cities[index]; // marker([], { draggable: true title: "title"  })
  L.marker(city.location, {
    draggable: true
  })
   //.bindPopup("<h1>" + city.name + "</h1><hr><h3> Population" + city.population + "</h3>")
   .bindPopup(`<h1>${city.name}</h1> <hr> <h3>Population ${city.population}</h3>`)
   .addTo(myMap);
}



