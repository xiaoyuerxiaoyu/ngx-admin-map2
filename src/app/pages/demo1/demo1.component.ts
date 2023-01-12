import { Component, OnInit, ViewChild } from '@angular/core';
import {MapInfoWindow, MapMarker, GoogleMap, MapKmlLayer} from '@angular/google-maps';
// import { sensorInfo,LEVEL_CONFIG } from './demo1.data';
import { LEVEL_CONFIG, GEO_DATA_H } from './demo1.data';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';

interface SENSOR＿INFO {
  ID: String;
  position: 
  {
    lat: Number,
    lng: Number
  };
  value: Number;
}

@Component({
  selector: 'ngx-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss'],
})
export class Demo1Component implements OnInit {

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  @ViewChild(GoogleMap) googleMap: GoogleMap;

  readonly interval = interval(1000); // 1s

  infoWindowView: Boolean= true;
  radioGroupValue = '1';
  // sensorInfo = sensorInfo;
  sensorInfo: any;
  sensorValue: any;
  LEVEL_CONFIG = LEVEL_CONFIG;
  infoFlg: Boolean = true;
  GEO_DATA_H = GEO_DATA_H;

  // kmlUrl = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
  // kmlUrl = 'https://googlearchive.github.io/js-v2-samples/ggeoxml/blackbirds.kml';
  kmlUrl = 'http://localhost:8081/map.kml'
  // constructor() { }

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.loadSensorInfo(1);
    // console.log("ngOnInit");
    // console.log(this.sensorInfo);
  }

  // onMarkerClick(): void {
  //   // console.log("TEST");
  //   console.log("TEST");
  // }

  readonly position = { lat: 34.24, lng: 132.27 };

  // readonly position = { lat: 51.678418, lng: 7.809007 };
  // readonly markers = [{lat: 52.678418, lng: 7.909007},{lat: 51.778418, lng: 7.999007},{lat: 51.978418, lng: 7.869007}]
  // readonly myIcon = {fillColor:BubbleChartComponent;}



  readonly svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };

  public getIcon(item): object {
    if(this.radioGroupValue == "1") {
      return this.getIcon1(item);
    }
    else {
      return this.getIcon2(item);
    }
  }
  public getIcon1(item): object {
    
    let config = LEVEL_CONFIG[0];
    LEVEL_CONFIG.forEach(element => { 
      if(item.value >= element.threshold.min && item.value < element.threshold.max){
        config = element;
      }
    });

    let ret: google.maps.Symbol = {
        path:google.maps.SymbolPath.CIRCLE,
        fillColor: config.iconColor,
        strokeColor: config.iconColor,
        scale: 8 + config.level * 2,
    }
    // return this.svgMarker;

    return ret;
  }

  public getIcon2(item): google.maps.Icon {
    let config = LEVEL_CONFIG[0];
    LEVEL_CONFIG.forEach(element => { 
      if(item.value >= element.threshold.min && item.value < element.threshold.max){
        config = element;
      }
    });

    let ret: google.maps.Icon = {
        // url: './assets/sensor/icons/marker_red.svg'
        url: config.icon
    }
    return ret;
  }

infoContent = '';

async openInfoWindow(marker: MapMarker, item) {

    if(this.infoWindowView == false)
    {
      return;
    }
    console.log("OPEN");

    // this.loadSensorInfo(0);
    await this.loadSensorValue(0, item.ID);
    
    console.log(this.sensorValue);

    let sContent = '';
            
    // sContent += '<ul class="info_ul">';
    // sContent += '   <li class="info_li">';
    // sContent += '       <span class="info_span">センサID：</span>';
    // sContent += '       <span>' + item.ID + '</span>';
    // sContent += '   </li>';
    // sContent += '   <li class="info_li">';
    // sContent += '       <span class="info_span">緯度：</span>';
    // sContent += '       <span>' + item.point[0] + '</span>';
    // sContent += '   </li>';
    // sContent += '   <li class="info_li">';
    // sContent += '       <span class="info_span">経度：</span>';
    // sContent += '       <span>' + item.point[1] + '</span>';
    // sContent += '   </li>';
    // sContent += '   <li class="info_li">';
    // sContent += '       <span class="info_span">測定値：</span>';
    // sContent += '       <span>' + item.value + '</span>';
    // sContent += '   </li>';
    // sContent += '</ul>';

    // sContent += '<ul class="info_ul">';
    // sContent += '   <li class="info_li">';
    // sContent += '       <span class="info_span">センサID：</span>';
    // sContent += '       <span>' + item.ID + '</span>';
    // sContent += '   </li>';
    // sContent += '   <li class="info_li">';
    // sContent += '       <span class="info_span">緯度：</span>';
    // sContent += '       <span>' + item.position.lat + '</span>';
    // sContent += '   </li>';
    // sContent += '   <li class="info_li">';
    // sContent += '       <span class="info_span">経度：</span>';
    // sContent += '       <span>' + item.position.lng + '</span>';
    // sContent += '   </li>';
    // sContent += '   <li class="info_li">';
    // sContent += '       <span class="info_span">測定値：</span>';
    // sContent += '       <span>' + item.value + '</span>';
    // sContent += '   </li>';
    // sContent += '</ul>';
    
    sContent += '<ul class="info_ul">';
    sContent += '   <li class="info_li">';
    sContent += '       <span class="info_span">センサID：</span>';
    sContent += '       <span>' + this.sensorValue.ID + '</span>';
    sContent += '   </li>';
    sContent += '   <li class="info_li">';
    sContent += '       <span class="info_span">緯度：</span>';
    sContent += '       <span>' + this.sensorValue.position.lat + '</span>';
    sContent += '   </li>';
    sContent += '   <li class="info_li">';
    sContent += '       <span class="info_span">経度：</span>';
    sContent += '       <span>' + this.sensorValue.position.lng + '</span>';
    sContent += '   </li>';
    sContent += '   <li class="info_li">';
    sContent += '       <span class="info_span">測定値：</span>';
    sContent += '       <span>' + this.sensorValue.value + '</span>';
    sContent += '   </li>';
    sContent += '</ul>';

    // this.infoContent = content;
    this.infoContent = sContent
    this.infoWindow.open(marker);
  }

  loadSensorInfo(val) {
    // console.log("loadSensorInfo" + val);
    // console.log("val%4" + val%4);
    // this.interval(1000).pipe
    this.http.get('assets/sensor/sensorinfo_'+ val%4 + '.json')
    .subscribe(data => {
      this.sensorInfo = data;
      // console.log(data)
    });
    // console.log(this.sensorInfo);
  }

  addJson(){
    // this.googleMap.data.addGeoJson(this.GEO_DATA_H);
    this.googleMap.data.addGeoJson(this.GEO_DATA_H);
    
    // const test = new MapKmlLayer(this.googleMap, );

    // const ctaLayer = new google.maps.KmlLayer({
    //   url: "https://googlearchive.github.io/js-v2-samples/ggeoxml/cta.kml",
    //   map: this.googleMap,
    // });

  }

  updateInfo(){
    console.log("updateInfo");
    this.loadSensorInfo(0);
  }

  // this.interval.subscribe(data => {
  //   loadSensorInfo();
  // })
  

  // //emit value in sequence every 1 second
  // readonly source = interval(1000);
  // //output: 0,1,2,3,4,5....
  // readonly subscribe = this.source.subscribe(val => {
  //   this.loadSensorInfo(val);
  // });

    // readonly subscribe = interval(1000).subscribe(val => {
    //   this.loadSensorInfo(val);
    // });

    // async loadSensorValue(val, id) {
    //   // console.log("loadSensorInfo" + val);
    //   // console.log("val%4" + val%4);
    //   // this.interval(1000).pipe
    //   await this.http.get<SENSOR＿INFO[]>('assets/sensor/sensorinfo_'+ val%4 + '.json')
    //   .subscribe(data => {
    //     this.sensorValue = data.filter(item => item.ID == id)[0];
    //     console.log(this.sensorValue)
    //   });
    //   // console.log(this.sensorInfo);
    // }

    private async loadSensorValue(val, id){
      const data = await this.http.get<SENSOR＿INFO[]>('assets/sensor/sensorinfo_'+ val%4 + '.json').toPromise();
      this.sensorValue = data.filter(item => item.ID == id)[0];
      // console.log("Data: " + JSON.stringify(data));
    }

}
