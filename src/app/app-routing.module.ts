import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { ListPropertyComponent } from './list-property/list-property.component';
import { PropertiesComponent } from './properties/properties.component';
import { DetailComponent } from './properties/detail/detail.component';
import { EditComponent } from './properties/detail/edit/edit.component';


const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent },
  {path: 'verify-email', component: VerifyEmailComponent },
  {path: 'list-property', component: ListPropertyComponent},
  {path: 'properties', component: PropertiesComponent}, 
  {path: 'properties/details/:id', component: DetailComponent },
  {path: 'properties/details/:id/edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
