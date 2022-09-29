// This code helps to initialize the maplayer
// setView allow you to set to the specific region on the map
var map = L.map("map").setView([6.921, 6.669], 10);

// Adding OSM tile to the map
var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

// Adding scale to map
L.control.scale().addTo(map);

//  Adding coordinate to a map
map.on("mousemove", function (e) {
   $("#coordinate").html(
     `Lat:${e.latlng.lat.toFixed(3)}, Lng :${e.latlng.lng.toFixed(3)}`
   );
 });

 // BASE MAP CODE LAYOUT
// Adding other basemap layers
var googleStreets = L.tileLayer(
   "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
   {
     maxZoom: 20,
     subdomains: ["mt0", "mt1", "mt2", "mt3"],
   }
 );
 
 var googleHybrid = L.tileLayer(
   "http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}",
   {
     maxZoom: 20,
     subdomains: ["mt0", "mt1", "mt2", "mt3"],
   }
 );
 
 var googleTerrain = L.tileLayer(
   "http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}",
   {
     maxZoom: 20,
     subdomains: ["mt0", "mt1", "mt2", "mt3"],
   }
 );
 
 var googleSat = L.tileLayer(
   "http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}",
   {
     maxZoom: 20,
     subdomains: ["mt0", "mt1", "mt2", "mt3"],
   }
 );


//WMS CODE FOR ADDING REGION
var regionWMS = L.tileLayer.wms(" http://localhost:8080/geoserver/Flood/wms", {
    layers: '	Flood:ROI',
    format: 'image/png',
    transparent: true,
    attribution:"JUWON ISHOLA"
}).addTo(map)                    

//WMS CODE FOR ADDING WATERBODY
var riverWMS = L.tileLayer.wms(" http://localhost:8080/geoserver/Flood/wms", {
    layers: '	Flood:Permanent-Waterbody',
    format: 'image/png',
    transparent: true,
    attribution:"JUWON ISHOLA"
}).addTo(map) 

//WMS CODE FOR ADDING SETTLLEMENTS
var placesWMS = L.tileLayer.wms(" http://localhost:8080/geoserver/Flood/wms", {
    layers: '		Flood:Settlements',
    format: 'image/png',
    transparent: true,
    attribution:"JUWON ISHOLA"
}).addTo(map) 

var floodStyle = {
  color: "red",
  fillColor: "red",
  opacity: 0.3,
  weight: 1,
};

// Adding flooded data
var floodLayer = L.geoJson(postFlood, {
  style: floodStyle,
  // onEachFeature: function (feature, layer) {
  //   // adding a popup to all the features
  //   layer.bindPopup(feature.properties.NAME);
  // },
});

 // To add basemaps
var baseLayers = {
   "OpenstreetMap": osm,
   "Google Streets": googleStreets,
   "Google Hybrid": googleHybrid,
   "Google Terrain": googleTerrain,
   "Google Satellite": googleSat,
 };

 // // To add layers
var overlays = {
   "Region": regionWMS,
   "Permanent Water": riverWMS,
   "Settlements":placesWMS,
   "Flood":  floodLayer,
//    "Health Centers":healthWMS
 };

 // add layer control to map
L.control.layers(baseLayers, overlays).addTo(map);

// Adding leaflet browser print control to map
L.control.browserPrint({ position: "topleft" }).addTo(map);