import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { DataService } from 'src/app/services/dataService.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css']
})
export class ListPropertyComponent implements OnInit {
errors: string;


  listPropertyForm = new FormGroup({
    name: new FormControl('', [Validators.pattern(/^[A-Za-z]+/), Validators.required, Validators.maxLength(20)]),
    imageUrl: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    price: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(30)])
    });

  @Input() formGroup?: FormGroup;
  constructor( private dataService: DataService, private toastr: ToastrService, private router: Router, private spinner: NgxSpinnerService) { }
  amentitiesArray: string[] = [];
  isLoading: boolean = false;
  existingNames: any = [];
  ngOnInit(): void {}
  checkCheckBoxvalue(event){
   
    if(event.checked){
      this.amentitiesArray.push(event.source.value)
    }else{
      let index = this.amentitiesArray.indexOf(event.source.value);
      this.amentitiesArray.splice(index, 1)
    }
  }

  formValid(listPropertyForm){
    if(listPropertyForm.get('name').valid && listPropertyForm.get('imageUrl').valid && listPropertyForm.get('description').valid && listPropertyForm.get('price').valid
    && listPropertyForm.get('address').valid){
      return false;
    }else{
      return true;
    }
  }

  async onSubmit(){

    const nameExists = await this.nameExists();

    if(!nameExists){
      return;

    }

      this.isLoading = true;
      this.dataService.addProperty(this.listPropertyForm.get('name').value, this.listPropertyForm.get('imageUrl').value,
       this.listPropertyForm.get('description').value, this.listPropertyForm.get('price').value, this.amentitiesArray, this.listPropertyForm.get('address').value)
       .then((data) => {
        this.toastr.success('Success')
        this.router.navigate(['properties'])
       }).catch((err) => {
        this.toastr.error(err.message)
        console.log(err.message)
      })

    

  };

  async nameExists() {
    const test = await this.dataService.getPropertiesSearch();
    console.log(test);

      test.forEach(p => {
        if(p.name.toLowerCase() === (this.listPropertyForm.get('name').value).toLowerCase()){
          this.existingNames.push(p.name);
        }
      })
      
    

    if(this.existingNames.length > 0){
      this.existingNames = [];
      this.toastr.error("Name exists!")
      return false;
  }

  return true;
  }
  
}
  

