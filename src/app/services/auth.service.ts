import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../auth/user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
interface Login {
  email: string;
  password: string;
}
interface Signup extends Login {
  mobileNumber: string;
  confirmPassword: string;
}
interface AuthResposeData {
  email: string;
  id: string;
  accessToken: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl = environment.url;
  user = new BehaviorSubject<User>(null);
  expireTime: number = 86400;
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  signup(signupData: Signup) {
    return this.http
      .post<AuthResposeData>(`${this.baseUrl}/register`, signupData)
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.id,
            resData.accessToken,
            this.expireTime
          );
        })
      );
  }

  login(credentials: Login) {
    return this.http
      .post<AuthResposeData>(`${this.baseUrl}/log-in`, credentials)
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.id,
            resData.accessToken,
            this.expireTime
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = 
      new Date (userData._tokenExpirationDate).getTime() -
      new Date ().getTime()
      this.autoLogout(expirationDuration)
    }
  }
  autoLogout(expirationDuration: number){
     this.tokenExpirationTimer = setTimeout(()=>{
       this.logout();
     },expirationDuration)
  }
  logout() {
    this.user.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  verify(data:{email:string}){
    return this.http.post(`${this.baseUrl}/VerificationOfEmail`,data)
  }
}
