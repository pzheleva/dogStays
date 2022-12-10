import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/dataService.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: any;
  fullName: string;
  userReservations: any = [];
  userReservationsJoined: string;
  hasLengthReservation: boolean;
  userProperties: any = [];
  hasLengthProperties: boolean;
  userPropertiesJoined: string;

  constructor(private dataService: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.toastr.info('Loading profile...');
    this.email = JSON.parse(localStorage.getItem('user')).email;
    this.fullName = JSON.parse(localStorage.getItem('user'))['displayName'];

    this.dataService.reservationsOfUser().then((data) => {
      data.forEach((p) => this.userReservations.push(`${p.fromDate} - ${p.toDate}`));
      console.log(this.userReservations)
     this.userReservationsJoined = this.userReservations.join(", ");
     if(this.userReservations.length === 0){
      this.hasLengthReservation = false;
    }else{
      this.hasLengthReservation = true;
    }

    })
  
   
    this.dataService.listedPropertiesOfUser().then((data) => {
      data.forEach((p) => this.userProperties.push(p.name));
      this.userPropertiesJoined = this.userProperties.join(', ');
      console.log(this.userPropertiesJoined);

      if(this.userProperties.length === 0){
        this.hasLengthProperties = false;
      }else{
        this.hasLengthProperties = true;
      };
    });

    

    this.toastr.success('Profile loaded');
  }

  
}
