/*
 * Example Implementation of the custom google map
 */

import MapApplication from "../MapApplication.js";
import Marker from "./Marker.js";
import { config, mapinit } from "./config.js";

// Instantiate the app and pass in the mapConfig obj
const myMap = new MapApplication(config);

// Render the map to the page
// After the map finished initializing, get and set the users

let init = myMap.init(mapinit).then(function () {
    //marker images
  let redIcon = "./Map-Marker.png";
  let blueIcon = "./map-pin.png";
//marker data
  let rome = { name: "Rome", markerUrl: blueIcon };
  let athens = { name: "Athens", markerUrl: redIcon };
  let bucharest = { name: "Bucharest", markerUrl: blueIcon };
  let toulouse = { name: "Toulouse", markerUrl: blueIcon };
  let algiers = { name: "Algiers", markerUrl: redIcon };

  //create markers
  let m1 = new Marker(rome);
  let m2 = new Marker(athens);
  let m3 = new Marker(toulouse);
  let m4 = new Marker(bucharest);
  let m5 = new Marker(algiers);

  m2.setPosition({
    lat: 37.9838,
    lng: 23.7275,
  });

  m3.setPosition({
    lat: 43.6047,
    lng: 1.4442,
  });

  m4.setPosition({
    lat: 44.4268,
    lng: 26.1025,
  });

  m5.setPosition({
    lat: 36.7538,
    lng: 3.0588,
  });

  let markers = [m1, m2, m3, m4, m5];

  myMap.render(markers);


});

export default myMap;
