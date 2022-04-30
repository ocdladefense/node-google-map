# Overview
A google map api based module that uses a custom theme and markers with info windows.
The package contains a series of javascript files that allows custom data to be added to the google maps api map.
There are also custom theme files included for customization purposes.

## What you need to implement this package
* JSON data from a web API / Database backend <br>
* A main.js File that imports MapApplication and UrlMarker <br>
* A config.js File that contains a Google maps api key <br>

## Installation
* Clone from GitHub
* In the terminal run: ```npm run build```

## Displaying the Map
## Map Styling
## Map Marker Features
## Marker Data Sources
## Map Event Handling

Create a config.js file in your project that contains a list of "Features" objects to be passed to the MapApplication.js file in the package.
LoadFeatures and LoadFeatureData will be called from main to populate these objects with data and the loadMarkers function will generate the object markers on the map based on these objects.

Config should contain a const MapInit array that has multiple functions that fetches the json data and places it into the "Cache" Array at a designated index.
This array and all of its functions are passed through main to mapApplication.
The MapInit should look similar to the following:
```
const mapinit = [
  function() {
      cache["data1"] = fetch("WEB API URL HERE").then(resp => {
        return resp.json();
      });
    },
      function() {
      cache["data2"] = fetch("WEB API URL HERE").then(resp => {
        return resp.json();
      });
    },
];
```

Each feature object must contain a Data array and a datasource property that takes in a function designed by the user to pass the data from the Cache to the data array on the individual object. This function looks similar to the following:
```
function populateData()
{ 
  $example= cache["data1"];

  $objects = $example.then(examples => {
    return examples.map(example => {
      let newObject = new Object(example);
      return newObject;
    });
  });
  return $objects;
};
```
A feature object looks similar to the following:

```
const features = {
  object: {
    name: "objectName",
    label: "objectLabel",
    markerLabel: "O",
    data: [],
    markerStyle:
      "/markers/Example-Marker.png",
    datasource: populateData,
  },
  }
  ```
  
  ### Example Main.js
  
  ```
  import MapApplication from './node_modules/custom-google-map/MapApplication.js';
import UrlMarker from './node_modules/custom-google-map/markers/UrlMarker';


// Instantiate the app and pass in the Config
const myMap = new MapApplication(config);

// Render the map to the page

// mapinit is the array of data functions contained in config.js
let init = myMap.init(mapinit).then(function () {

	//console.log("map loaded");

	// Set up the features and load in the data

	myMap.loadFeatures(features);
	myMap.loadFeatureData();

});
export default myMap;
```
  
