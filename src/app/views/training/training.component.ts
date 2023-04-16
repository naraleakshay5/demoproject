import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  isLoggedIn: boolean = false;
  loginForm: any = FormGroup;

  loginCred: any = [
    {
      user: 'test',
      pass: 1234,
    },
  ];
  constructor(private router: Router, private fb: FormBuilder) {}

  submitted = false;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    console.log(this.loginCred.user);
    // this.isLoggedIn = true;

    //True if all the fields are filled
    if (this.loginForm.valid) {
      this.isLoggedIn = true;
    }

    const loginId = this.loginCred.filter((ele: any) => {
      return {
        user: ele.user,
        pass: ele.pass,
      };
    });
    console.log(loginId);
  }

  masking() {
    this.router.navigate(['training/training-masking']);
  }

  hotpress() {
    this.router.navigate(['training/hot-press']);
  }

  winding() {}
}
