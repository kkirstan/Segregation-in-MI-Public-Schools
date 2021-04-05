// // Creating map object
// var map = L.map("map", {
//     center: [42.33, -83.04],
//     zoom: 9
// });

// /* Control panel to display map layers */
// var controlLayers = L.control.layers( null, null, {
//     position: "topright",
//     collapsed: false
// }).addTo(map);

//   // Display Carto basemap tiles with light features and labels
// var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
// }).addTo(map); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
// controlLayers.addBaseLayer(light, 'Light basemap');

// // add an OpenStreetMap tile layer
// var streetmap = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//     attribution: 'The map contributors',
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
// });
// controlLayers.addBaseLayer(streetmap, 'OpenStreetMap');

// function chooseColor(frl_count, per_white) {
//     return frl_count > 66 && per_white < 50 ? 'purple' :
//         frl_count > 66 && per_white > 50 ? 'red' :
//         frl_count < 33 ? 'green' :
//         "yellow";
// }

// // see more basemap options at https://leaflet-extras.github.io/leaflet-providers/preview/
// var link = "https://school-data-server.herokuapp.com/api";

// // Read markers data from cleaned_data.csv
// d3.json(link, function(data) {
    
//     // For each row in data, create a marker and add it to the map
//     // For each row, columns `lat`, `lng`, and `eligible_for_frl` are required
//     for (var i = 0; i < data.district_data.length; i++) {
//         var lat = data.district_data[i].lat;
//         var lng = data.district_data[i].lng;
//         var district = data.district_data[i].district;
//         var frl_count = data.district_data[i].prcnt_stdnts_eligible_for_frl;
//         var majority_minority = data.district_data[i].majority_minority;
//         var school_location = [lat,lng];
//         var per_white = data.district_data[i].ave_prcnt_wht;

//         var marker = L.circle(school_location, 500, {
//             stroke: true,
//             color: chooseColor(frl_count, per_white),
//             opacity: 1,
//             fill: true,
//             fillColor: chooseColor(frl_count, per_white),
//             fillOpacity: 1,
//         }).bindPopup(district + "<br> Free and Reduced Lunch Eligibility: " + frl_count + "%" + "<br> Majority-Minority District: " + majority_minority);
      
//         marker.addTo(map);
//     }
// });

///////////////////////


// Set a same-site cookie for first-party contexts
document.cookie = 'cookie1=value1; SameSite=Lax';
// Set a cross-site cookie for third-party contexts
document.cookie = 'cookie2=value2; SameSite=None; Secure';

// Create function to select marker color
function chooseColor(frl_count, per_white) {
    return frl_count > 66 && per_white < 50 ? 'purple' :
        frl_count > 66 && per_white > 50 ? 'red' :
        frl_count < 33 ? 'green' :
        "yellow";
}

// API links
var districtLink = "https://school-data-server.herokuapp.com/api";
var schoolLink = "https://school-data-server.herokuapp.com/school_api";

function createMap(districts) {
    // Create base layers
    // Light Layer
    var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    // Streetmap Layer
    var streetmap = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'The map contributors',
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox-light",
        accessToken: API_KEY
    });

    // Create a baseMaps object
    var baseMaps = {
        "Light": light,
        "Street Map": streetmap
    };

    // Create an overlay object
    var overlayMaps = {
        "Districts": districts
    };

    // Create map object
    var map = L.map("map", {
        center: [42.33, -83.04],
        zoom: 9,
        layers: [light, streetmap, districts]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
};

// Read markers data from cleaned_data.csv
function createLayers(data) {
    var districtMarkers = []
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
    createMap(L.layerGroup(districtMarkers));
}

d3.json(districtLink, createLayers);