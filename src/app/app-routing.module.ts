import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './modules/user/login/login.component'; 
import { RegisterComponent } from './modules/user/register/register/register.component';
import { VerifyEmailComponent } from './modules/user/verify-email/verify-email.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { ListPropertyComponent } from './modules/property/list-property/list-property.component';
import { PropertiesComponent } from './modules/property/properties/properties.component';
import { DetailComponent } from './modules/property/properties/detail/detail.component';
import { EditComponent } from './modules/property/properties/detail/edit/edit.component';
import { ProfileComponent } from './modules/user/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { loggedInGuard } from './guards/loggedInGuards.guard';
import { NotFoundComponent } from './modules/core/not-found/not-found.component';
import { AboutComponent } from './modules/core/about/about.component';


const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent, canActivate: [loggedInGuard]},
  {path: 'login', component: LoginComponent, canActivate: [loggedInGuard]},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'list-property', component: ListPropertyComponent, canActivate: [AuthGuard]},
  {path: 'properties', component: PropertiesComponent}, 
  {path: 'properties/details/:id', component: DetailComponent, canActivate: [AuthGuard] },
  {path: 'properties/details/:id/edit', component: EditComponent, canActivate: [AuthGuard] },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: 'search', component: SearchComponent},
  {path: "about", component: AboutComponent},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
