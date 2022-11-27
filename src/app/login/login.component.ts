
import { Component, Input, OnInit } from '@angular/core';
import { NgForm, Validators, FormControl, FormGroup, NgModel } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { AuthService } from '../services/authService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() formGroup?: FormGroup;
  constructor(
    public authservice: AuthService
  ) {
   }

  userData: any

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/)]),

  });

  ngOnInit(): void {
  }


  formValid(loginForm){
    if(loginForm.get('email').valid && loginForm.get('password').valid){
      return false;
    }else{
      return true;
    }
  }

}