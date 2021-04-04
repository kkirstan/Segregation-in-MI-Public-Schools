// Creating map object
var map = L.map("map", {
    center: [44.18, -84.50],
    zoom: 6
});

/* Control panel to display map layers */
var controlLayers = L.control.layers( null, null, {
    position: "topright",
    collapsed: false
}).addTo(map);

  // Display Carto basemap tiles with light features and labels
var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(map); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
controlLayers.addBaseLayer(light, 'Light basemap');

// add an OpenStreetMap tile layer
var streetmap = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'The map contributors',
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});
controlLayers.addBaseLayer(streetmap, 'OpenStreetMap');

function chooseColor(rev_per_student, per_white) {
    return rev_per_student > 12 ? 'green' :
        rev_per_student < 12 && per_white < 50 ? 'purple' :
        'red';
}

// see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/
var link = "https://school-data-server.herokuapp.com/api";

// Read markers data from cleaned_data.csv
d3.json(link, function(data) {
    
    // For each row in data, create a marker and add it to the map
    // For each row, columns `lat`, `lng`, and `eligible_for_frl` are required
    for (var i = 0; i < data.district_data.length; i++) {
        var lat = data.district_data[i].lat;
        var lng = data.district_data[i].lng;
        var district = data.district_data[i].district;
        var rev_per_student = data.district_data[i].tot_rev_per_s;
        var majority_minority = data.district_data[i].majority_minority;
        var school_location = [lat,lng];
        var per_white = data.district_data[i].ave_prcnt_wht;

        var marker = L.circle(school_location, 500, {
            stroke: true,
            color: chooseColor(rev_per_student, per_white),
            opacity: 1,
            fill: true,
            fillColor: chooseColor(rev_per_student, per_white),
            fillOpacity: 1,
        }).bindPopup(district + "<br> Total Revenue Per Student: $" + rev_per_student + "<br> Majority-Minority District: " + majority_minority);
      
        marker.addTo(map);
    }
});
