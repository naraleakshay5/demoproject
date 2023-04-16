import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AppStorage } from 'src/app/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage: boolean = false;
  constructor(
    private loginService: LoginService,
    private _cookieService: CookieService,
    private router: Router,
    private appStorage: AppStorage
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  // get f(){
  //   // return this.loginForm.controls;
  // }

  ngOnInit(): void {
    this._cookieService.deleteAll();
  }

  login() {
    let reqObj = this.loginForm.value;
    this.loginService.login(reqObj).subscribe({
      next: (response: any) => {
        if (
          response &&
          response.statusCode == 200 &&
          response.status == 'success'
        ) {
          this._cookieService.set('token', response.data.token);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('currentUser', response.data.userData.username);
          localStorage.setItem(
            'USER_DATA',
            JSON.stringify({
              name: response.data.userData.name,
              userName: response.data.userData.username,
              email: response.data.userData.email,
              role: response.data.userData.role,
              user_profile: response.data.userData.user_profile,
            })
          );
          // const lastUrl = localStorage.getItem('lastUrl');
          // if (lastUrl) {
          //   this.router.navigate([lastUrl]);
          //   localStorage.removeItem('lastUrl');
          // } else {
          //   this.router.navigate(['/home']);
          // }
          if (response.data.userData.role == 'Supervisor') {
            this.router.navigate(['/aoi-sup']);
          } else if (this.appStorage.get('STATION').process_slug === 'resin') {
            this.router.navigate(['/op/res']);
          } else {
            this.router.navigate(['/po-list']);
          }
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        console.info(error);
        this.errorMessage = error?.error?.message;
      },
    });
  }
}
