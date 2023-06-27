import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject,Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  roleLoggedIn= false;
  username:any;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  redirectUrl = 'http://localhost:4200/home'; 
  user:any;
  

  constructor(private http: HttpClient, private router: Router,private userService:UserService) {
    this.checkLoggedIn(); // Call checkLoggedIn() in constructor
  }

  logout() {
    localStorage.removeItem('key');
    localStorage.removeItem('role');
    localStorage.removeItem('token'); // Remove the token from local storage
    this.isLoggedIn = false; // Update isLoggedIn to false
    this.roleLoggedIn =false;
    this.router.navigate(['/login']); // Redirect to the login page
  }
  
  getToken() {
    return localStorage.getItem('token');
  }

  getUsername() {
    return localStorage.getItem('key');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  getCurrentUser(): Observable<User> {
    this.username = this.getUsername();
    return this.userService.getUserByUsername(this.username).pipe(
      map((resp: any) => {
        this.user = resp;
        console.log(this.user.username);
        return this.user;
      })
    );
  }

  checkLoggedIn() {
    if(this.getRole())
    this.roleLoggedIn=true;
    else this.roleLoggedIn=false;
    if(this.getUsername())
       this.user = this.getUsername();
    if (this.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}