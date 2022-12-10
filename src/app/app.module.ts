import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './modules/core/header/header.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './modules/user/register/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './modules/user/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ToastrModule} from "ngx-toastr"
import { CookieService } from 'ngx-cookie-service';
import { environment } from './environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule, SETTINGS } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { VerifyEmailComponent } from './modules/user/verify-email/verify-email.component';
import { connectFirestoreEmulator, enableIndexedDbPersistence, FirestoreSettings, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Firestore, initializeFirestore } from 'firebase/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp, getApp } from 'firebase/app';
import { AuthService } from './services/authService.service';
import { ListPropertyComponent } from './modules/property/list-property/list-property.component';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR, SETTINGS as USE_FIRESTORE_SETTINGS, } from '@angular/fire/compat/firestore';
import { PropertiesComponent } from './modules/property/properties/properties.component';
import { DetailComponent } from './modules/property/properties/detail/detail.component';
import { MatInputModule } from '@angular/material/input';
import { EditComponent } from './modules/property/properties/detail/edit/edit.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ProfileComponent } from './modules/user/profile/profile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchComponent } from './components/search/search.component';
import { FooterComponent } from './modules/core/footer/footer.component';
import { NotFoundComponent } from './modules/core/not-found/not-found.component';
import { AboutComponent } from './modules/core/about/about.component';
import { AppComponent } from './app.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common'



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
    EditComponent,
    ProfileComponent,
    SearchComponent,
    FooterComponent,
    NotFoundComponent,
    AboutComponent,
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
    MatInputModule,
    NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'}),
    Ng2SearchPipeModule,
    MatDatepickerModule,
  ],
  providers: [
  CookieService,
  AuthService,
  DatePipe
],
  bootstrap: [AppComponent]
})
export class AppModule {
 }

//  {
//   provide: HTTP_INTERCEPTORS,
//   useClass: ErrorInterceptor,
//   multi: true
// },

