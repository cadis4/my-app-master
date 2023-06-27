import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
// import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-adduser-register',
  templateUrl: './adduser-register.component.html',
  styleUrls: ['./adduser-register.component.css']
})
export class AddUserComponent {
  id: any;
  user: User = new User();
  isEditMode: boolean=false;
  addEditUserForm!: FormGroup;
  isAddEditMode:boolean=false;

 
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.roleLoggedIn && this.isAddEditMode) {
      // Redirect to login page
      this.router.navigate(['/home']);
    }
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.route.snapshot.data['isEditMode'];
    this.isAddEditMode =this.route.snapshot.data['isAddEditMode']

    if (this.isEditMode) {
      this.getUserById();
    }
    
    this.addEditUserForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      role: [""],
      passwordHash: [""],
      confirmPassword: ['']
    }, { validator: this.passwordMatchValidator });
  } 

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    if (password && confirmPassword && confirmPassword.value !== '' && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
  
    return null;
  }
  

  
  get addUser(): any {
    return this.addEditUserForm.controls;
  }

  addOrEditUser() {
    if (this.addEditUserForm.valid) {
      let user: User = {
        id: !this.isEditMode ? 0 : this.id,
        username: this.addUser.username.value,
        role: this.isAddEditMode ? this.addUser.role.value : 'User',
        password:this.addUser.password.value,
        passwordHash:"",
      }
      if( !this.isAddEditMode) user.role='User';
      if (!this.isEditMode && this.isAddEditMode) {
        this.userService.addUser(user).subscribe({
          next: () => {
            this.toastr.success("User successfully added!");
            this.router.navigate(['/users']);
          },
          error: (e) => {console.log(e)
            if (e.status === 409) {
              this.toastr.error("Username already taken, please provide another username!");
            }
          }
        });
      } else  if (this.isEditMode && this.isAddEditMode) { console.log(user)
        this.userService.updateUser(user).subscribe({
          next: () => {
            this.toastr.success("User successfully updated!");
            this.router.navigate(['/users']);
          },
          error: () => {
             { 
              this.toastr.error("An error has occured");
            }
          }
        });
      }else if (!this.isEditMode && !this.isAddEditMode) {
        console.log(user);
      
        if (this.addUser.confirmPassword.value === '') {
          this.toastr.error("Please enter a password confirmation!");
          return;
        }
      
        this.userService.addUser(user).subscribe({
          next: () => {
            this.toastr.success("User successfully created!");
      
            this.userService.login(user).subscribe({
              next: (data: any) => {
                localStorage.setItem('token', data);
                localStorage.setItem('key', user.username);
      
                this.userService.getUserByUsername(user.username).subscribe({
                  next: (resp: any) => {
                    if (resp.role == "Admin")
                      localStorage.setItem('role', resp.role);
                    else
                      localStorage.removeItem('role');
      
                    console.log(localStorage.getItem('role'))
                    this.authService.checkLoggedIn();
                  }
                });
      
                console.log(localStorage.getItem('key'))
                console.log(localStorage.getItem('token'));
                this.toastr.success("Successfully Authenticated");
      
                this.authService.checkLoggedIn();
                this.router.navigate(['/home']);
              },
              error: (error: any) => {
                this.toastr.error("Username or password is invalid");
              },
              complete: () => {
                console.log("User registration and login completed!");
              }
            });
          },
          error: (e) => {
            if (e.status === 409) {
              this.toastr.error("Username already taken, please provide another username!");
            }
          }
        });
      }
      
    }
  }

  getUserById() {
    this.userService.getUser(this.id).subscribe({
      next: resp => {
        console.log(resp)
        this.user = {
          id: this.id,
          username: resp.username,
          role : resp.role,
          password :resp.password,
          passwordHash:resp.passwordHash,
        }
        console.log(this.user)
      },
      error: (e) => {
       {  e="Error";
          this.toastr.error(e.error);
        }
      }
    });
  }

}