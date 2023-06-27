import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
user: User = new User();
maintenances:any;
constructor( private userService: UserService,private authService: AuthService,private toastr: ToastrService,private router: Router) { }
onSubmit() { this.login(this.user);
} 
  login(user: User) {
    console.log(user);
    this.userService.login(user).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data);
        localStorage.setItem('key',user.username);
        this.userService.getUserByUsername(user.username).subscribe({
          next: (resp:any) =>{
            if (resp.role=="Admin")
            localStorage.setItem('role',resp.role);
            else localStorage.removeItem('role');

            console.log(localStorage.getItem('role'))
            this.authService.checkLoggedIn();
          }
        })
        console.log(localStorage.getItem('key'))
        console.log(localStorage.getItem('token'));
        this.toastr.success("Successfully Authenticated");

        this.authService.checkLoggedIn();
          this.router.navigate(['/home']); 
      },
      error: (error: any) => {
        this.toastr.error("Username or password is invalid")
      }
    });
  }
logout() {
  this.authService.logout(); 
}
}