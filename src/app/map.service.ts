import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { GEOMETRIES } from "./geometries";
import 'leaflet-editable';
import 'leaflet-path-drag';

const TOOLBAR_OPTIONS = {
  position: 'bottomright',
  draw: {
    circle: false, // Turns off this drawing tool
    marker: false, // Turns off this drawing tool
    circlemarker: false, // Turns off this drawing tool
    rectangle: false, // Turns off this drawing tool
    editToolbar: true,
  }
};

const TILES_URL = "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}";
const TILES_OPTIONS = {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1Ijoic29lcjQ0MyIsImEiOiJjampvbnBwd20wMHA0M3ZvYnkxamRzeWgyIn0.Cgeft_nl8sS4ow4hujreVw',
};

@Injectable()
export class MapService {
  private mymap: any;
  private GEOMETRIES = GEOMETRIES;
  private polygons = [];
  private perimeters = [];
  selectedPolygon = '';

  init() {

    this.mymap = L.map('mapid', {editable: true, draggable: true }).setView([51.505, -0.09], 13);
    let editableLayers = new L.FeatureGroup();
    this.mymap.addLayer(editableLayers);

    this.mymap.on('click', function(evt) {

    });

    L.tileLayer(TILES_URL, TILES_OPTIONS).addTo(this.mymap);


    let drawnItems = new L.FeatureGroup();
    this.mymap.addLayer(drawnItems);

    let drawControl = new L.Control.Draw(TOOLBAR_OPTIONS, {
      edit: {
        featureGroup: drawnItems
      }
    });

    this.mymap.addControl(drawControl);

    this.polygons = this.GEOMETRIES.map((geo) => {
      const poly = L.polygon(geo,{color: '#3388FF', draggable:true}).addTo(this.mymap);
      poly.enableEdit();
      return poly;
    });

    var newPolygon;

    this.mymap.on('draw:created', function (e) {
      drawnItems.addLayer(e.layer);
      e.layer.enableEdit();
    this.newPolygon = e.layer.getLatLngs();
      document.getElementById('selected').innerHTML = this.newPolygon;
    });

    this.mymap.on('draw:edited', function(e) {
      let layers = e.layers;
      layers.eachLayer(function(layer){
        console.log(layer.getLatLngs())
      });
    });
  }



  goToPolygon(n) {
    this.mymap.flyToBounds( this.polygons[n]);
    const latlngs = this.polygons[n].getLatLngs()[0];
    this.selectedPolygon = JSON.stringify(this.polygons[n].getLatLngs()[0].map((latlng) => ({lat: latlng.lat, lng: latlng.lng})));
     console.log(this.selectedPolygon);
     return this.selectedPolygon;
  }

  addPerimeter(perimeter) {
    console.log(perimeter);
    const object = JSON.parse(perimeter);
    this.perimeters.push(L.polygon(object, {color: 'green'}).addTo(this.mymap));
  }

  removePerimeter() {
    if (this.perimeters.length === 0) {
      return;
    }
    this.mymap.removeLayer(this.perimeters[ this.perimeters.length - 1 ]);
    this.perimeters = this.perimeters.slice(0, this.perimeters.length - 1);
  }


  getSecondPoint(perimeter) {
    let object = JSON.parse(perimeter);
    let arr = this.mymap.project(object);
    let c = {radius: 60};
    let y = arr.y;
    let x = arr.x;
    let h = (object.heading * 3.1416) / 180;
    let y2 = y + (c.radius * Math.cos(h));
    let x2 = x + (Math.sin(h) * c.radius);
    let arr2 = {y:y2, x:x2};
    console.log(arr2);
    let arr3 = this.mymap.unproject(arr2);
    console.log(arr3);
    var polyline = [
      arr3,
      object
    ];
    console.log(polyline);
    var r = L.polyline(polyline, {color: 'red'}).addTo(this.mymap);
  }
}
