import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";
  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.form)
      .subscribe(
        (data) => {
          console.log("DATA:",data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
          this.errorMessage = error.error.message; 
          this.isSuccessful = false;
          this.isSignUpFailed = true;
          this.router.navigate(['/register']);
        });
  }


}
