import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef,private authService: AuthService,private toastr: ToastrService) {}
  isLoggedIn:any;
  isRoleLoggedIn:any;
  currentUser:any;
  ngOnInit(){
    this.checkLoggedIn();
    
  }
  ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = '#355C7D';
  }
  checkLoggedIn() {this.isRoleLoggedIn=this.authService.roleLoggedIn;
    this.isLoggedIn = this.authService.isLoggedIn;
    console.log('User is logged in:', this.isLoggedIn);}
  logout() {
    this.toastr.success('Successfully logged out');
    this.authService.logout(); // Call the logout method in AuthService
    this.checkLoggedIn();
  }
    
  get loggedInStatus(): boolean {
    return this.authService.isLoggedIn;
  }

  get loggedRole(): boolean {
    return this.authService.roleLoggedIn;
  }
}
