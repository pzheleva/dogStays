import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  currUser: any;

  constructor( public authservice: AuthService) { }

  ngOnInit(): void {
  
  }

}
