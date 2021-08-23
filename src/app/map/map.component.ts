import { Component, OnInit, NgZone } from '@angular/core';

import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 0;
  lng: number = 0;
  private geoCoder: any;
  

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude as number;
      this.lng = position.coords.longitude as number;

      console.log(this.lat + " " + this.lng);
    },() => {
        alert('Something wrong of the connection!');
    },{timeout:5000});
  }


}
