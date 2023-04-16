import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.isLoggedIn = false;
  }

  login(user: any) {
    this.isLoggedIn = true;
    return this.http.post(environment.baseUrl + '/v1/auth/login', user);
  }
}
