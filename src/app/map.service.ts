import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { GEOMETRIES } from "./geometries";
import 'leaflet-editable';

const TOOLBAR_OPTIONS = {
  position: 'bottomright',
  draw: {
    circle: false, // Turns off this drawing tool
    marker: false, // Turns off this drawing tool
    circlemarker: false, // Turns off this drawing tool
    polyline: false, // Turns off this drawing tool
    rectangle: false, // Turns off this drawing tool
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
    this.mymap = L.map('mapid', {editable: true}).setView([51.505, -0.09], 13);

    L.tileLayer(TILES_URL, TILES_OPTIONS).addTo(this.mymap);



    let drawnItems = new L.FeatureGroup();
    this.mymap.addLayer(drawnItems);

    let drawControl = new L.Control.Draw(TOOLBAR_OPTIONS, {
      edit: {
        featureGroup: drawnItems
      }
    });

    this.mymap.addControl(drawControl);

    this.mymap.on('draw:created', function (e) {
      drawnItems.addLayer(e.layer);
    });

    this.polygons = this.GEOMETRIES.map((geo) => {
      const poly = L.polygon(geo, {color: '#3388FF'}).addTo(this.mymap);
      poly.enableEdit();
      return poly;
    });
  }

  goToPolygon(n) {
    this.mymap.flyToBounds( this.polygons[n]);
    const latlngs = this.polygons[n].getLatLngs()[0];
    this.selectedPolygon = JSON.stringify(this.polygons[n].getLatLngs()[0].map((latlng) => ({lat: latlng.lat, lng: latlng.lng})));
     console.log(this.selectedPolygon);
     return this.selectedPolygon
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


  getSecondPoint() {
    // const latLngsString = document.getElementById('dPoly').value;
    // const object = JSON.parse(latLngsString);
    // console.log(object);
    // const c = {radius: 0.005};
    // const lat = object.lat;
    // const lng = object.lng;
    // const h = (object.heading * 3.1416) / 180;
    // const lat1 = lat + c.radius - (c.radius * Math.sin(h));
    // const lng1 = lng + (Math.sin(h) * c.radius);
    // var polyline = [
    //   {lat: lat, lng: lng},
    //   {lat: lat1, lng: lng1}
    // ];
    // console.log(polyline);
    // var r = L.polyline(polyline, {color: 'red'}).addTo(mymap);
  }
}
