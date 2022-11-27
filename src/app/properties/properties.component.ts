import { Component, OnInit } from '@angular/core';
import { QuerySnapshot } from 'firebase/firestore';
import { DataService } from '../services/dataService.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties: any[];
  hasLength: boolean;


  constructor(private dataService: DataService) { 

  this.dataService.getProperties().then((querySnapshot) => {
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
