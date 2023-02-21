// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2d6MjAwMCIsImEiOiJjbGNxOTV5azkwM252M3htczhmdWdrYjFxIn0.LDgB8-AifLQYcaGlrzXHcA";

const style_All = "mapbox://styles/ggz2000/cldi48rqv000201n27g58h977";
const style_1995 = "mapbox://styles/ggz2000/cldkcr0v4002g01pe6mth0m0m";
const style_1996 = "mapbox://styles/ggz2000/cldkcugv6008p01rvf3g0sesn";
const style_2011 = "mapbox://styles/ggz2000/cldkf975t002g01t9a30kscn5";
const style_2012 = "mapbox://styles/ggz2000/cldkf7t4f008x01rvqk4snwve";
const style_2013 = "mapbox://styles/ggz2000/cldkcxwn5002701t9jptcafqs";

//define the center of the map using the longitude and latitude
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: style_All,
  center: [-3.236, 55.934],
  zoom: 11
});

const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");
//On click the radio button, toggle the style of the map.
for (const input of inputs) {
  input.onclick = (layer) => {
    if (layer.target.id == "style_All") {
      map.setStyle(style_All);
    }
    if (layer.target.id == "style_1995") {
      map.setStyle(style_1995);
    }
    if (layer.target.id == "style_1996") {
      map.setStyle(style_1996);
    }
    if (layer.target.id == "style_2011") {
      map.setStyle(style_2011);
    }
    if (layer.target.id == "style_2012") {
      map.setStyle(style_2012);
    }
    if (layer.target.id == "style_2013") {
      map.setStyle(style_2013);
    }
  };
}

// Add legend
map.on("load", () => {
  const layers = ["in 1995", "in 1996", "in 2011", "in 2012", "in 2013"];
  const colors = ["#e7298a", "#fb9a99", "#1b9e77", "#d95f02", "#7570b3"];
  // create legend
  const legend = document.getElementById("legend");
  layers.forEach((layer, i) => {
    const color = colors[i];
    const key = document.createElement("div");

    //place holder

    key.className = "legend-key";
    key.style.backgroundColor = color;
    key.innerHTML = `${layer}`;
    legend.appendChild(key);
  });
});

const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in Edinburgh", // Placeholder text for the search bar
  proximity: {
    longitude: 56,
    latitude: -3
  } // Coordinates of Edinburgh center
});

//add a search bar
map.addControl(geocoder, "top-right");

// add a navigation control
map.addControl(new mapboxgl.NavigationControl(), "top-right");

//add a full screen control
map.addControl(new mapboxgl.FullscreenControl());

// add a locate control
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-right"
);

map.on("click", (event) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["grit-bin"] // replace with your layer name
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  /* 
    Create a popup, specify its options 
    and properties, and add it to the map.
  */
  const popup = new mapboxgl.Popup({ offset: [0, -15], className: "my-popup" })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h4>Location: ${feature.properties.Location}</h4>
    <p>Position: ${feature.properties.Position}</p>
    <p>Route: ${feature.properties.Route}</p>
    <p>FID: ${feature.properties.FID}</p>
    `
    )
    .addTo(map);
});