
// Set a same-site cookie for first-party contexts
document.cookie = 'cookie1=value1; SameSite=Lax';
// Set a cross-site cookie for third-party contexts
document.cookie = 'cookie2=value2; SameSite=None; Secure';

// Create function to select marker color for District filter
function chooseColor(frl_count) {
    return frl_count > 66 ? 'red' :
        frl_count < 33 ? 'green' :
        'yellow';
}
// Create function to select marker color for Minority filter
function chooseMinority(frl_count, per_white) {
    return frl_count > 66 && per_white > 50 ? 'red' :
        frl_count > 66 && per_white < 50 ? 'blue' :
        frl_count < 33 && per_white < 50 ? 'blue' :
        frl_count > 33 && frl_count < 66 && per_white < 50 ? 'blue' :
        frl_count < 33 ? 'green' :
        'yellow';
}

// API links
var districtLink = "https://school-data-server.herokuapp.com/api";

var districtMarkers = [];
var minorityMarkers = [];

function createMap(districts) {
    // Create base layers
    // Streetmap Layer
    var streetmap = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
        id: "mapbox/streetmap",
        maxZoom: 18,
	    accessToken: API_KEY,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
    // Carto Topo Layer
    var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        accessToken: API_KEY,
        maxZoom: 19
    });
    // Create two separate layer groups: one for cities and one for states
    var districts = L.layerGroup(districtMarkers);
    var minorities = L.layerGroup(minorityMarkers);
    // Create a baseMaps object
    var baseMaps = {
        "Street Map": streetmap,
        "Light Map": light,
    };

    // Create an overlay object
    var overlayMaps = {
        "Districts": districts,
        "Minority Districts": minorities,
    };

    // Create map object
    var map = L.map("map", {
        center: [42.33, -83.04],
        zoom: 9,
        layers: [streetmap, light, districts]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
};

// Read markers data from cleaned_data.csv
function createLayers(data) {
    //var districtMarkers = []
    // For each row in data, create a marker and add it to the map
    // For each row, columns `lat`, `lng`, and `eligible_for_frl` are required
    for (var i = 0; i < data.district_data.length; i++) {
        var lat = data.district_data[i].lat;
        var lng = data.district_data[i].lng;
        var district = data.district_data[i].district;
        var frl_count = data.district_data[i].prcnt_stdnts_eligible_for_frl;
        var majority_minority = data.district_data[i].majority_minority;
        var district_location = [lat,lng];
        var per_white = data.district_data[i].ave_prcnt_wht;
                
        var marker = 
            L.circle(district_location, 500, {
                stroke: true,
                color: chooseColor(frl_count, per_white),
                opacity: 1,
                fill: true,
                fillColor: chooseColor(frl_count, per_white),
                fillOpacity: 1,
            
            }).bindPopup(district + "<br> Free and Reduced Lunch Eligibility: " + frl_count + "%" + "<br> Majority-Minority District: " + majority_minority)
        districtMarkers.push(marker);  
    }
    //createMap(L.layerGroup(districtMarkers));

    //var minorityMarkers = []

    for (var i=0; i < data.district_data.length; i++) {
        var lat = data.district_data[i].lat;
        var lng = data.district_data[i].lng;
        var district = data.district_data[i].district;
        var frl_count = data.district_data[i].prcnt_stdnts_eligible_for_frl;
        var majority_minority = data.district_data[i].majority_minority;
        var district_location = [lat,lng];
        var per_white = data.district_data[i].ave_prcnt_wht;
        
    
        var marker = L.circle(district_location, 500, {
            stroke: true,
            color: chooseMinority(frl_count, per_white),
            opacity: 1,
            fill: true,
            fillColor: chooseMinority(frl_count, per_white),
            fillOpacity: 1,  
        }).bindPopup(district + "<br> Free and Reduced Lunch Eligibility: " + frl_count + "%" + "<br> Majority-Minority District: " + majority_minority)
    minorityMarkers.push(marker);

    }
    createMap(districtMarkers, minorityMarkers);
}

d3.json(districtLink, createLayers);