var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;

// Create the createMap function
function createMap(bikeStations) {
  let lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
})

  let baseMaps = {
  "Light Map": lightmap
}

  let overlayMaps = {
  "Bike Stations": bikeStations
};

  let map = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [lightmap, bikeStations]
  })

  L.control.layers(baseMaps, overlayMaps, {
    collapse: false
  }).addTo(map);
}

function createMarkers(response) {
  let stations = response.data.stations
  console.log(stations)

  let bikeMarkers = []
    for(let index=0; index < stations.length; index++) {
      let station = stations[index];
      let bikeMarker = L.marker([station.lat, station.lon])
        .bindPopup("<h3>" + station.name + "</h3><h3>Capacity:" + station.capacity + "</h3>");
      bikeMarkers.push(bikeMarker);
    }

    createMap(L.layerGroup(bikeMarkers));
}

var queryURL = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"

d3.json(queryURL, createMarkers);
// Create the tile layer that will be the background of our map
// Create a baseMaps object to hold the lightmap layer
// Create an overlayMaps object to hold the bikeStations layer


  // Create the map object with options


  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map

// Create the createMarkers function

  // Pull the "stations" property off of response.data

  // Initialize an array to hold bike markers

  // Loop through the stations array
    // For each station, create a marker and bind a popup with the station's name

    // Add the marker to the bikeMarkers array

  // Create a layer group made from the bike markers array, pass it into the createMap function


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete