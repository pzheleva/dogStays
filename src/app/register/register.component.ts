import { Component, Input, OnInit } from '@angular/core';
import { NgForm, Validators, FormControl, FormGroup, NgModel, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { AuthService } from '../services/authService.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
  displayName: new FormControl('', [Validators.pattern(/^[A-Za-z]+/), Validators.required]),
  email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
  password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/)]),
  rePassword: new FormControl('', Validators.required)
  }, {validators: rePasswordValidator});

  error: string = null;

  @Input() formGroup?: FormGroup;
  constructor(
    public authservice: AuthService
  ) { }


  ngOnInit(): void {
  }

 
formValid(registerForm){
  if(registerForm.get('displayName').valid && registerForm.get('email').valid && registerForm.get('password').valid && (registerForm.get('password').value === registerForm.get('rePassword').value)){
    return false;
  }else{
    return true;
  }
}
}

export const rePasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const rePassword = control.get('rePassword');

  return password && rePassword && password.value === rePassword.value ? { rePassword: true } : {rePassword: false};
}

