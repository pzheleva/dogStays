import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  constructor(public authservice: AuthService) { }

  ngOnInit(): void {
  if(document.cookie){
    this.loggedIn = true
  }else{
    false
  }

  
  }

  

  

}
