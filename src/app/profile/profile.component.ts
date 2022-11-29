import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/dataService.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: any;
  fullName: string;
  userReservations: any;
  hasLengthReservation: boolean;
  userProperties: any;
  hasLengthProperties: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('user')).email;
    this.fullName = JSON.parse(localStorage.getItem('user'))['displayName'];
    this.dataService.reservationsOfUser().then((data) => {
      this.userReservations = data;
    })

    if(this.userReservations.length === 0){
      this.hasLengthReservation = false;
    }else{
      this.hasLengthReservation = true;
    }
   
    this.dataService.listedPropertiesOfUser().then((data) => {
      this.userProperties = data;
    });

    if(this.userProperties.length === 0){
      this.hasLengthProperties = false;
    }else{
      this.hasLengthProperties = true;
    }
  }

  
}
