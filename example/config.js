import MapTheme from '../MapTheme.js';

const mapTheme = new MapTheme;

const mapKey = Keys.mapKey;

const InfoWindow = {
  content: `
        <h1>Info</h1>
    `,
};

// Starting/default position for the center of the map (Vancouver, WA)
const startingMapPosition = {
    latitude: 41.9028,
    longitude: 12.4964,
};

// Set up a MapConfiguration object
const config = {
  apiKey: mapKey,
  target: "map",
  //repository: repository, // Where to get data consumed by the Map.
  mapOptions: {
    zoom: 6,
    styles: mapTheme.theme(),
    center: {
      lat: startingMapPosition.latitude,
      lng: startingMapPosition.longitude,
    },
    //styles: startTheme.getTheme(),
    defaultMarkerStyles: {
      icon: {
        scaledSize: {
          height: 50,
          width: 50,
        },
      },
    },
  },
  enableHighAccuracy: true,
};

const featureLabelConfig = {
  E: "example",
};

const cache = [];

const mapinit = [
  function () {
    cache["examples"] = Promise.resolve({ hello: "world", foo: "bar" });
  },
];

//populates features with data
function populateData() {
  $examples = cache["examples"];

  return $examples;
}

//custom datasources
const features = {
  example: {
    name: "example",
    label: "example",
    markerLabel: "E",
    data: [],
    status: "E",
    markerStyle: "./marker.png",
    datasource: populateData,
  },
};

export { config, mapinit };