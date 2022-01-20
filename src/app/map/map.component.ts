import { Component, Input, OnInit } from '@angular/core';
import Map from 'ol/Map';
import Title from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj.js'
import { defaults, DoubleClickZoom, DragAndDrop, Select } from 'ol/interaction';
import { defaults as defaultControls, ScaleLine, FullScreen } from 'ol/control.js';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style'
import TileLayer from 'ol/layer/Tile';
import TileJSON from 'ol/source/TileJSON'
import {} from 'jquery'
import { Signalement } from '../models/signalement.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() signalement !: Signalement;
  map: any;
  constructor() { }

  ngOnInit() { 
      this.initilizeMap();
  }
  

  initilizeMap() { 
    $('#ficheModal').on('shown.bs.modal', function(){ 
      var localisation: string[] | any;
      localisation= $("#LONG_LAT").val()?.toString().split(',');
      document.getElementById('map')!.innerHTML='';
      var map = new Map({
        target: 'map',
        interactions: defaults({
          doubleClickZoom: false,
          dragPan: false,
          mouseWheelZoom: false,
        }),
        controls: defaultControls({
          attribution: false,
          zoom: false,
        }),
        layers: [
          new Title({
            source: new OSM()
          })
        ],
        view: new View({
          //center : fromLonLat([localisation])
          center: fromLonLat([Number.parseFloat(localisation[1]),Number.parseFloat(localisation[0])] ),
          zoom: 8
        })
      });
  
      var markers = new VectorLayer({
        source: new VectorSource(),
        style: new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'https://img.icons8.com/material-rounded/24/000000/location-marker.png',
          })
        })
      });
      map.addLayer(markers);
      //var marker = new Feature(new Point(fromLonLat([localisation])));
      var marker = new Feature(new Point(fromLonLat([Number.parseFloat(localisation[1]),Number.parseFloat(localisation[0])])));
      markers.getSource().addFeature(marker);
      map.updateSize();
    }); 
  }
}