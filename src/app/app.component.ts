import { Component, OnInit } from '@angular/core';
import {MapService} from "./map.service";
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private mapService: MapService){}

  ngOnInit() {
    this.mapService.init()
  }
}
