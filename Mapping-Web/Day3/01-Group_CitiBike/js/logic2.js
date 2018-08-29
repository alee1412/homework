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

let layers = {
    COMING_SOON: new L.LayerGroup(),
    EMPTY: new L.LayerGroup(),
    LOW: new L.LayerGroup(),
    NORMAL: new L.LayerGroup(),
    OUT_OF_ORDER: new L.LayerGroup()
}

let map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [
        layers.COMING_SOON,
        layers.EMPTY,
        layers.LOW,
        layers.NORMAL,
        layers.OUT_OF_ORDER
    ]
})

lightmap.addTo(map)

let overlays = {
    "Coming Soon": layers.COMING_SOON,
    "Empty Station": layers.EMPTY,
    "Low Stations": layers.LOW,
    "Healthy Stations": layers.NORMAL,
    "Out of Order": layers.OUT_OF_ORDER
}

layers.control.layers(null, overlays).addTo(map);
let info = L.control({
    position: "bottomright"
})

info.onAdd = function() {
    let div = L.DomUtil.create("div", "legend")
    return DataView
}

info.addTo(map)

let icons = {
    COMING_SOON: L.ExtraMarkers.icon({
        icon: "ion-settings",
        iconColor: "white",
        markerColor: "yellow",
        shape: "star"
    }),
    EMPTY: L.ExtraMarkers.icon({
        icon: "ion-android-bicycle",,
        iconColor: "white",
        markerColor: "red",
        shape: "circle"
    }),
    OUT_OF_ORDER: L.ExtraMarkers.icon({
        icon: "ion-minus-circled",
        iconColor: "white",
        markerColor: "blue-dark",
        shape: "penta"
    }),
    LOW: L.ExtraMarkers.icon({
        icon: "ion-android-bicycle",,
        iconColor: "white",
        markerColor: "orange",
        shape: "star"
    }),   
    NORMAL: L.ExtraMarkers.icon({
        icon: "ion-android-bicycle",
        iconColor: "white",
        markerColor: "green",
        shape: "circle"
    })
}

var queryURL = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"

d3.json(queryURL, function(infoRes){
    
});

}