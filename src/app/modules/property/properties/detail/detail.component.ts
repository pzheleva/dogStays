import { Component, OnInit } from '@angular/core';
import { Property } from 'src/models/property.model';
import { AuthService } from 'src/app/services/authService.service';
import { DataService } from 'src/app/services/dataService.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Reservation } from 'src/models/reservation.model';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  editLink: string;
  found: boolean;
  propertyModel: any = {};
  isNotValidLength: boolean;
  amenities: string;
  id: string
 

  bookForm = new FormGroup({
    dogName: new FormControl('',[Validators.pattern(/^[A-Za-z]+/)]),
    phone: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
    requirements: new FormControl('', [Validators.maxLength(200)]),
    });


  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }


  ngOnInit (): void {
   
    this.toastr.info('Loading details...');
    this.dataService.getPropertyById(this.route.snapshot.params['id'])
    .then((data) => {if(data.data() === undefined){
      this.found = false;
      return;
    }

    

    this.editLink = '/properties/details/' + this.route.snapshot.params['id'] + '/edit';
    this.id = this.route.snapshot.params['id'];
    this.propertyModel = data.data();
    console.log(this.propertyModel)
    let description = data.data()['description'];
    this.amenities = data.data()['amenities'].join(', ');
    this.toastr.success('Details loaded!');
    })

   
    if(this.bookForm.controls.requirements.value.length > 3){
      this.isNotValidLength = true;
    }else{
      this.isNotValidLength = false;
    }
    
  }

  addReservation(property: Property){
    this.dataService.bookPlace(this.route.snapshot.params['id'], this.bookForm.controls.dogName.value, this.bookForm.controls.phone.value, this.bookForm.controls.requirements.value);
    this.bookForm.reset();
  };

  deleteProperty(){
    this.dataService.removeProperty(this.route.snapshot.params['id']);
    this.toastr.success('Property deleted!')
  };

  isOwner(userId):boolean {
    let response = this.authService.getId;
  return response == userId }

   likeProperty(property: Property){
    this.dataService.likeProperty(this.route.snapshot.params['id'], property);
   }
 
}
