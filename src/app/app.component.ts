import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { PaysService } from './services/pays.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mall';
  isavlble:Boolean=false;
  constructor(private authService:AuthService,public nav:PaysService){}
  ngOnInit(){
    this.authService.autoLogin()
  }
}

