import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { IUser } from 'src/models/user.model';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase/compat';
import { onAuthStateChanged, updateCurrentUser } from 'firebase/auth';



  @Injectable({ providedIn: 'root'})
  export class AuthService {
   
    
    

    constructor(
      public angularfs: AngularFirestore,
      public angularAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone,
      private toastrs: ToastrService
    ) {}

    register(email: string, password: string, displayName: string) {
      return this.angularAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          /* Call the SendVerificaitonMail() function when new user sign 
          up and returns promise */
          
          result.user.updateProfile({
            displayName: displayName
          })
          this.SetUserData(result.user);
         

          if(result.user && result.user.emailVerified === false){
            this.SendVerificationMail();
          }
        })
        .catch((error) => {
          this.errorHandler(error.code);
        });
    }

    login(email:string, password: string) {
     
      return this.angularAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        
        if(result.user.emailVerified === false){
          
          this.router.navigate(['verify-email'])
          this.toastrs.info("Email still not verified!")
        }else{
          this.SetUserData(result.user);
          localStorage.setItem('user', JSON.stringify(result.user)),
          JSON.parse(localStorage.getItem('user'));
          this.router.navigate(['properties'])
      
      }
      }).catch((error) => {
        console.log(error)
        console.log(error.code)
        this.errorHandler(error.code);
      });
    };

    SendVerificationMail() {
      return this.angularAuth.currentUser.then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email'])
      })
    }


    SetUserData(u: any) {
      const user: AngularFirestoreDocument<any> = this.angularfs.doc(`user/${u.uid}`);

      const data: IUser = {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        emailVerified: u.emailVerified
      };
      return user.set(data, {
        merge: true,
    });
  }

  LogOut() {
    return this.angularAuth.signOut().then(() => {

      localStorage.removeItem('user');
      this.router.navigate(['home']);
      this.toastrs.info("You were successfully logged out!")
    })
  };

 get userLogged(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  get getId() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user.uid;
  }

  get getEmail() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user.email;
  }


  errorHandler(errorCode: string) {
    let errorMsg = ''
    switch (errorCode) {
      case "auth/invalid-email":
          errorMsg = "Bad Request.";
        break;
      case "auth/email-already-exists":
          errorMsg = "Email exists!";
        break;
      case "auth/wrong-password":
          errorMsg = "Wrong password!";
        break;
      case "auth/user-not-found":
          errorMsg = "Email not found. Please register!";
          break;
      case "auth/email-already-in-use":
          errorMsg = "Email exists!";
          break;
      default:
          errorMsg = "Something went wrong!";
    }

    if(errorCode){
      this.toastrs.error(errorMsg)
    }
  }

  };



 

 



