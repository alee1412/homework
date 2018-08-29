// create the map object
var map = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 11
});

// create tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {

  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var link = "http://data.beta.nyc//dataset/0ff93d2d-90ba-457c-9f7e-39e47bf2ac5f/resource/" +
"35dd04fb-81b3-479b-a074-a27a37888ce7/download/d085e2f8d0b54d4590b1e7d1f35594c1pediacitiesnycneighborhoods.geojson";

function chooseColor(borough) {
    switch (borough) {
    case "Brooklyn":
        return "yellow";
    case "Bronx":
        return "red";
    case "Manhattan":
        return "orange";
    case "Queens":
        return "green";
    case "Staten Island":
        return "purple";
    default:
        return "black";
    }
}

d3.json(link, function(data) {
    L.geoJSON(data, {
        style: function(feature) {
            return {
                color: "white",
                fillColor: chooseColor(feature.properties.borough),
                fillOpacity: 0.5,
                weight: 1.5
            };
        },
            onEachFeature: function(feature, layer) {
                //Set mouse event to change map styling
                layer.on({
                    mouseover: function(event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.9
                        });
                    },
                    mouseout: function(event) {
                        layer = event.target;
                        layer.setStyle({
                            fillOpacity: 0.5
                        });
                    },
                    click: function(event) {
                        map.fitBounds(event.target.getBounds());
                    }
                });
                layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");
            }
    }).addTo(map);
});