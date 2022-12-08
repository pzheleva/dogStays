
import { Component, Input, OnInit } from '@angular/core';
import { NgForm, Validators, FormControl, FormGroup, NgModel } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/authService.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 

  @Input() formGroup?: FormGroup;
  
  constructor(
    public authservice: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
   }

  userData: any;
  isLoading: boolean = false;

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

  onSubmit(){
    this.isLoading = true;
    this.authservice.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
  }

}