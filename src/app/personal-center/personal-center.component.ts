import { Component, OnInit } from '@angular/core';
import { PaysService } from '../services/pays.service';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css']
})
export class PersonalCenterComponent implements OnInit {
  isavlble:Boolean=false;
  constructor(public nav:PaysService) { }

  ngOnInit(): void {
    
  }
  

}
