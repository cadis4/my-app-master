import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeletedialogComponent } from 'src/app/deletedialog/deletedialog.component';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  users:any;
  currentUser:any;
  theuserId:number=0;
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  columnsToDisplay: string[] = ["username","role","actions"];
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private authService:AuthService,private router:Router,private userService: UserService,public dialog: MatDialog,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    if (!this.authService.roleLoggedIn) {
      // Redirect to the login page
      this.router.navigate(['/home']);
    }
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onDelete(user: User): void {
    this.deleteUser(user);
  }

  deleteUser( user: any): void {
    const dialogRef = this.dialog.open(DeletedialogComponent);
    dialogRef.componentInstance.message = "Are you sure you want to delete this user ?";
    this.currentUser = user;
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteUserConfirmed();
    });
  }

  deleteUserConfirmed(): void {
    this.userService.deleteUser(this.currentUser.id).subscribe({
      next: resp => {
        this.toastr.info("User succesfully deleted");
        this.getUsers();
      },
      error: error => {
        error="User was not deleted";
        this.toastr.info(error);
      }
    });
  }
  
  
  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: resp => {
        console.log(resp);
        this.users = resp;
        this.dataSource.data = resp;
      },
      error: error => {
        console.log(error)
      }
    })
  }
}