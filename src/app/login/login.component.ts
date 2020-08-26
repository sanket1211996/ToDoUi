import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  ngOnInit(): void {
  }

  onSubmit() {
    //console.log(this.form);
    this.authService.login(this.form)
      .subscribe(
        (data) => {
          console.log("Current User", this.form);

          this.isLoggedIn = true;
          this.isLoginFailed = false;
          this.authService.setToken(data['token'], this.form['username']);
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.errorMessage = "Please check the username/password";
          this.isLoggedIn = false;
          this.isLoginFailed = true;
        });
  }


}
