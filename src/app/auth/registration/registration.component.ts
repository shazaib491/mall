import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { passwordChecker } from '../custom_validation/password_checker';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  submit:boolean=false;
  OTP:number;
  optError:boolean=false;
  inputOTP:number;
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formbuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: passwordChecker('password', 'confirmPassword') }
    );
  }
  get h() {
    return this.registrationForm.controls;
  }
  onVerify(email: any) {
    if (this.registrationForm.controls.email.errors) {
      // console.log('email not valid');
    } else {
      let data ={
        email:email.value
      }
      this.authService.verify(data).subscribe(
        (data: any) => {
          this.OTP = data.OTP
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  verifyOTP(t){
    if(t.value !== this.OTP){
      this.optError = true
    }
    else{
      this.inputOTP = t.value
      this.optError = false
    }
  }
  onSubmit() {
    this.submit =true;
    if(!this.inputOTP){
       return console.log("OTP needed");
    }
    this.authService.signup(this.registrationForm.value).subscribe(
      (data: any) => {
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
