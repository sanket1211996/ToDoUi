import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Credintial } from "src/app/model/credintial";
import {  User } from "src/app/model/user";
import { Router } from '@angular/router';


const BASE_URL = 'http://localhost:8080';
const TOKEN_KEY = "access-token";
const USER_KEY = "user-name";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private router: Router) { }

  login(cred: Credintial) {
    return this.http.post(BASE_URL + '/login',cred);
  }

  register(user: User) {
    return this.http.post(BASE_URL + '/auth/signUp', user, httpOptions);
  }

  isLoggedIn() {
    return (localStorage.getItem(TOKEN_KEY) != null);
  }

  setToken(token: string, username: string) {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, username);
  }
  
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUsername() {
    return localStorage.getItem(USER_KEY);
  }

  resetToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.router.navigate(['/login']);
  }
}
