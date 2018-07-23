import { Injectable } from '@angular/core';
import * as L from 'leaflet';



@Injectable()
export class MapService {

  init() {
    let polygons = [];
    let arr = [];
    let selected = '';
    const mymap = L.map('mapid', {editable: true}).setView([51.505, -0.09], 13);

    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoic29lcjQ0MyIsImEiOiJjampvbnBwd20wMHA0M3ZvYnkxamRzeWgyIn0.Cgeft_nl8sS4ow4hujreVw'
    }).addTo(mymap);

    let options = {
      position: 'bottomright',
      draw: {
        circle: false, // Turns off this drawing tool
        marker: false, // Turns off this drawing tool
        circlemarker: false, // Turns off this drawing tool
        polyline: false, // Turns off this drawing tool
        rectangle: false, // Turns off this drawing tool
      }
    };

    let drawnItems = new L.FeatureGroup();
    mymap.addLayer(drawnItems);

    let drawControl = new L.Control.Draw(options, {
      edit: {
        featureGroup: drawnItems
      }
    });

    mymap.addControl(drawControl);

    mymap.on('draw:created', function (e) {
      let type = e.layerType,
        layer = e.layer;
      console.log(e.layer.getLatLngs());
      if (type === 'marker') {
      }
      drawnItems.addLayer(layer);
    });

    mymap.on('draw:edited', function (e) {
      let layers = e.layers;
      layers.eachLayer(function (layer) {
        console.log(layer.getLatLngs())
      });
    });

    mymap.on('draw:deleted', function () {
    });


    let polygon1 = L.polygon([
      [51.50311291428311, -0.08488655090332031],
      [51.503099557478556, -0.08403897285461426],
      [51.50264542379517, -0.08451104164123535],
      [51.502632066853636, -0.08403897285461426],
      [51.50209110743074, -0.0850045680999756],
      [51.502538568153156, -0.0848972797393799],
      [51.502545246638114, -0.08531570434570314]
    ], {color: '#3388FF'}).addTo(mymap);
    // polygon1.enableEdit();

    let latlngs2 = [
      [-54.8293576735939, 291.66370332241064],
      [-54.82957706139659, 291.66370332241064],
      [-54.829583241317444, 291.66401445865637],
      [-54.829472002597576, 291.66400372982025],
      [-54.829478182534494, 291.6645723581314],
      [-54.82976245861032, 291.6645830869675],
      [-54.829768638502784, 291.66400372982025],
      [-54.82966976010987, 291.66400372982025],
      [-54.82966976010987, 291.66382133960724],
      [-54.8299015059619, 291.66384816169744],
      [-54.82990768583309, 291.6651034355164],
      [-54.82975936866374, 291.66534483432775],
      [-54.82976245861032, 291.66504442691803],
      [-54.829527621995815, 291.6650229692459],
      [-54.829527621995815, 291.66532874107367],
      [-54.8293576735939, 291.6649425029755],
    ];

    let polygon2 = L.polygon(latlngs2, {color: '#3388FF'}).addTo(mymap);
    // polygon2.enableEdit();

    let latlngs3 = [
      [40.402614, 49.830905],
      [40.401536, 49.831329],
      [40.401609, 49.831678],
      [40.402394, 49.831383],
      [40.402447, 49.831624],
      [40.402749, 49.831495],
    ];

    let polygon3 = L.polygon(latlngs3, {color: '#3388FF'}).addTo(mymap);
    // polygon3.enableEdit();

    let latlngs4 = [
      [-23.587700168657204, -406.5819078683854],
      [-23.587867319815672, -406.5822350978852],
      [-23.588108213757735, -406.58224582672125],
      [-23.588314693927526, -406.5819776058198],
      [-23.588309777736775, -406.58110857009893],
      [-23.588073800364523, -406.58144652843487],
      [-23.588201621493837, -406.5814304351807],
      [-23.588118046154147, -406.5816020965577],
      [-23.5879705601307, -406.5816074609757],
      [-23.587891900850426, -406.5814626216889],
      [-23.587995141146127, -406.58129096031195],
      [-23.587862403608167, -406.580936908722],
      [-23.587670671371843, -406.58091545104986],
    ];

    let polygon4 = L.polygon(latlngs4, {color: '#3388FF'}).addTo(mymap);
    // polygon4.enableEdit();

    let latlngs5 = [
      [0.001212358474640014, -78.45240354537965],
      [-0.0006973743438514514, -78.45236063003541],
      [-0.0008153915404957979, -78.45140576362611],
      [0.0011265277861922164, -78.45125555992128],
    ];

    let polygon5 = L.polygon(latlngs5, {color: '#3388FF'}).addTo(mymap);

    // polygon5.enableEdit();

    function goToPoligonOne() {
      mymap.flyToBounds(polygon1);
      selected = JSON.stringify(polygon1.getLatLngs()[0].map((d) => ({lat: d.lat, lng: d.lng})));
      document.getElementById('selected').innerHTML = selected;
    }
    function goToPoligonTwo() {
      mymap.flyToBounds(polygon2);
      selected = JSON.stringify(polygon2.getLatLngs()[0].map((d) => ({lat: d.lat, lng: d.lng})));
      document.getElementById('selected').innerHTML = selected;
    }
    function goToPoligonThree() {
      mymap.flyToBounds(polygon3);
      selected = JSON.stringify(polygon3.getLatLngs()[0].map((d) => ({lat: d.lat, lng: d.lng})));
      document.getElementById('selected').innerHTML = selected;
    }
    function goToPoligonFour() {
      mymap.flyToBounds(polygon4);
      selected = JSON.stringify(polygon4.getLatLngs()[0].map((d) => ({lat: d.lat, lng: d.lng})));
      document.getElementById('selected').innerHTML = selected;
    }
    function goToPoligonFive() {
      mymap.flyToBounds(polygon5);
      selected = JSON.stringify(polygon5.getLatLngs()[0].map((d) => ({lat: d.lat, lng: d.lng})));
      document.getElementById('selected').innerHTML = selected;
    }
  }
}
