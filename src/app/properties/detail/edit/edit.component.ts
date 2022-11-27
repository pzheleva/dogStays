import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DataService } from 'src/app/services/dataService.service';
import { Amenities } from 'src/models/Amenities.model';
import { NgxSpinnerService } from "ngx-spinner"

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {



  property: any;
  elements: any;
  amenities: any;
  amenitiesArray: string[] = [];
  loading: boolean = false;

  propertyAmenities: Amenities [] = [
    {id: 0, name: "Designated Pet Walking/Potty Area", value: "Designated Pet Walking/Potty Area", flag: false},
    {id: 1, name: "Personal trainer", value: "Personal trainer", flag: false },
    {id: 2, name: "On-Site Pet Services" , value: "On-Site Pet Services",flag: false },
    {id: 3, name: "Private room for your dog" , value: "Private room for your dog",flag: false },
    {id: 4, name: "Video surveillance" , value: "Video surveillance",flag: false },
    {id: 5, name: "Grooming" , value: "Grooming",flag: false },
    {id: 6, name: "Welcome gift" , value: "Welcome gift",flag: false }
  ]

  editForm = new FormGroup({
    name: new FormControl('', [Validators.pattern(/^[A-Za-z]+/), Validators.required, Validators.maxLength(20)]),
    imageUrl: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    });

  constructor(private router: Router, private dataService: DataService, private route: ActivatedRoute, private ngxSpinner: NgxSpinnerService) {
    this.dataService.getPropertyById(this.route.snapshot.params['id']).then((data) => {
    this.property = data.data()
    this.amenities = this.property.amenities;
    console.log(this.amenities)
   
    
    this.editForm.controls.name.setValue(this.property.name);
    this.editForm.controls.imageUrl.setValue(this.property.imageUrl);
    this.editForm.controls.description.setValue(this.property.description);
    this.editForm.controls.price.setValue(this.property.price);

    this.elements = Array.from(document.querySelectorAll('mat-checkbox'));

    for(let i = 0; i < this.propertyAmenities.length; i++){
      if(this.propertyAmenities[i].value === this.amenities[0] || this.propertyAmenities[i].value === this.amenities[1]){
        this.propertyAmenities[i]['flag'] = true;
        this.amenitiesArray.push(this.propertyAmenities[i].value)
      }
    }
   
  })
   }

  ngOnInit(): void {
  }
  checkCheckBoxvalue(event){
   
    if(event.checked){
      this.amenitiesArray.push(event.source.value)
    }else{
      let index = this.amenitiesArray.indexOf(event.source.value);
      this.amenitiesArray.splice(index, 1)
    }
    console.log(this.amenitiesArray)
  }

  
  formValid(editForm){
    if(editForm.get('name').valid && editForm.get('imageUrl').valid && editForm.get('description').valid && editForm.get('price').valid){
      return false;
    }else{
      return true;
    }
  }

  onSubmit(){
  this.loading = true;
  const object = {...this.property, ...{name: this.editForm.controls.name.value, imageUrl: this.editForm.controls.imageUrl.value, description: this.editForm.controls.description.value,
  price: this.editForm.controls.price.value, amenities: this.amenitiesArray
  }}

  console.log(object)

  this.dataService.editProperty(object, this.route.snapshot.params['id']).then((data) => 
  {this.router.navigate([`/properties/details/${this.route.snapshot.params['id']}`])})
  .catch((err) => {
    console.log(err);
  });

  }
}
