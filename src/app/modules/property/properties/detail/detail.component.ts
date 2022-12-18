import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/components/models/property.model';
import { AuthService } from 'src/app/services/authService.service';
import { DataService } from 'src/app/services/dataService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Reservation } from 'src/app/components/models/reservation.model';
import { NgxSpinnerService } from 'ngx-spinner';
import {DatePipe} from '@angular/common'
import { ThisReceiver } from '@angular/compiler';


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
  todaysDate: Date = new Date();
  today: any = this.datePipe.transform(new Date(), "MM/dd/yyyy");
  isDisabled: boolean;



 

  bookForm = new FormGroup({
    dogName: new FormControl('',[Validators.pattern(/^[A-Za-z]+/), Validators.required]),
    phone: new FormControl('', [Validators.pattern(/^[0-9]*$/), Validators.required]),
    fromDate: new FormControl(),
    toDate: new FormControl(),
    });

  


  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private router: Router
    ) { }


  ngOnInit (): void {
    console.log(this.today)
    this.toastr.info('Loading details...');
    this.dataService.getPropertyById(this.route.snapshot.params['id'])
    .then((data) => {if(data.data() === undefined){
      this.found = false;
      return;
    }

    

    this.editLink = '/properties/details/' + this.route.snapshot.params['id'] + '/edit';
    this.id = this.route.snapshot.params['id'];
    this.propertyModel = data.data();
   
    let description = data.data()['description'];
    this.amenities = data.data()['amenities'].join(', ');
    this.toastr.success('Details loaded!');
    })

   
    // if(this.bookForm.controls.requirements.value.length > 3){
    //   this.isNotValidLength = true;
    // }else{
    //   this.isNotValidLength = false;
    // }
    
  }

  addReservation(){


    console.log(this.bookForm.get("toDate").value)

    if(this.bookForm.get("fromDate").value === null || this.bookForm.get("toDate").value === null){
      this.toastr.error('Please choose a date range!');
      return;
    }

    if(this.bookForm.get("fromDate").value > this.bookForm.get("toDate").value){
      this.toastr.error('ToDate cannot be before FromDate!');
      return;
    };
    
    if(this.bookForm.get("fromDate").value < this.todaysDate){
      this.toastr.error('FromDate cannot be in the past!');
      return;
    };

    

    this.dataService.bookPlace(this.route.snapshot.params['id'], this.bookForm.controls.dogName.value, this.bookForm.controls.phone.value, this.datePipe.transform(this.bookForm.get("fromDate").value, "yyyy-MM-dd"), this.datePipe.transform(this.bookForm.get("toDate").value, "yyyy-MM-dd"));
    this.bookForm.reset();
    this.router.navigate(['profile'])
  };


  

formValid(bookForm){
  if(bookForm.get('dogName').valid && bookForm.get('phone').valid){
    return false;
  }else{
    return true;
  }
}

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
