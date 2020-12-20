import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor( 
    private router:Router,
    private formbuilder: FormBuilder,
    private AuthService:AuthService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]],
    });
  }

  get h(){
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log(this.loginForm);   
    this.AuthService.login(this.loginForm.value)
    .subscribe(
      (data:any)=>{this.router.navigate(['/'])},
      (error:any)=>{console.log(error);
      }
    )
  }
}
