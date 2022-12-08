import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/dataService.service';

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

  constructor(private dataService: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.toastr.info('Loading profile...');
    this.email = JSON.parse(localStorage.getItem('user')).email;
    this.fullName = JSON.parse(localStorage.getItem('user'))['displayName'];
    this.dataService.reservationsOfUser().then((data) => {
      this.userReservations = data;
      this.toastr.success('Profile loaded!');
    })
    
    if(this.userReservations === undefined){
      this.hasLengthReservation = false;
    }else{
      this.hasLengthReservation = true;
    }
   
    this.dataService.listedPropertiesOfUser().then((data) => {
      this.userProperties = data;
    });
    console.log(this.userProperties)
    if(this.userProperties === undefined){
      this.hasLengthProperties = false;
    }else{
      this.hasLengthProperties = true;
    }
  }

  
}
