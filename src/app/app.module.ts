import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './interceptors/errors.interceptors';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ToastrModule} from "ngx-toastr"
import { CookieService } from 'ngx-cookie-service';
import { HeadersInterceptor } from "./interceptors/headers.interceptor"
import { environment } from './environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule, SETTINGS } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { connectFirestoreEmulator, enableIndexedDbPersistence, FirestoreSettings, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Firestore, initializeFirestore } from 'firebase/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp, getApp } from 'firebase/app';
import { AuthService } from './services/authService.service';
import { ListPropertyComponent } from './list-property/list-property.component';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR, SETTINGS as USE_FIRESTORE_SETTINGS, } from '@angular/fire/compat/firestore';
import { PropertiesComponent } from './properties/properties.component';
import { DetailComponent } from './properties/detail/detail.component'
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { EditComponent } from './properties/detail/edit/edit.component';
import { NgxSpinnerModule } from "ngx-spinner"



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    VerifyEmailComponent,
    ListPropertyComponent,
    PropertiesComponent,
    DetailComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-bottom-left",
    }),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(() => getFirestore()),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    NgxSpinnerModule
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeadersInterceptor,
    multi: true
  },
  CookieService,
  AuthService,
  {
  provide: USE_FIRESTORE_SETTINGS,
  useValue: { experimentalForceLongPolling: true }
}],
  bootstrap: [AppComponent]
})
export class AppModule {
 }

//  {
//   provide: HTTP_INTERCEPTORS,
//   useClass: ErrorInterceptor,
//   multi: true
// },

