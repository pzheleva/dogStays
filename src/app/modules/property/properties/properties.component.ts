import { Component, OnInit } from '@angular/core';
import { QuerySnapshot } from 'firebase/firestore';
import { DataService } from 'src/app/services/dataService.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { bounceInUpOnEnterAnimation, lightSpeedInAnimation } from 'angular-animations';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
  animations: [
    bounceInUpOnEnterAnimation({ anchor: 'enter1' }),
    bounceInUpOnEnterAnimation({ anchor: 'enter2', delay: 100 }),
    bounceInUpOnEnterAnimation({ anchor: 'enter3', delay: 200 }),
    lightSpeedInAnimation()
  ]
  
})
export class PropertiesComponent implements OnInit {
  properties: any[];
  hasLength: boolean;
  isLoading: boolean = false;
  // options = [
  //   {label: 'LightSpeed',
  //   animations: ['lightSpeed']
  // }
  // ];
  // animation = 'rubberBand';
  // animationState = false;
  // animationWithState = false;

  // animate() {
  //   this.animationState = false;
  //   setTimeout(() => {
  //     this.animationState = true;
  //     this.animationWithState = !this.animationWithState;
  //   })
  // }

  constructor(private dataService: DataService, private spinner: NgxSpinnerService) { 
    this.isLoading = true;
  this.dataService.getProperties().then((querySnapshot) => {
    this.isLoading = false;
    this.properties = querySnapshot.docs;
   
    if(this.properties.length === 0){
      this.hasLength = true;
    }else{
      this.hasLength = false;
    }
  
  })

  }


  ngOnInit(): void {
  }

}
