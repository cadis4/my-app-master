import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../models/quiz.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {  Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})

export class ResourcesComponent implements OnInit {

  quizzes : Quiz[]=[];
  quiz: Quiz = new Quiz();
  dialogOpen:boolean=false;
  promovabilityRate:any;
  quizTakeRate:any;
  currentUser:any;
  currentGrade:any;
  currentMaxGrade:any;
  currentPassed:any;
  mediumBestGrade:any;
  userLength:any;
  users:any;
  constructor( private quizService: QuizService, private dialog: MatDialog, private authService:AuthService,private router: Router,private userService: UserService){ }
    ngOnInit(): void {
      this.getQuizzes();
      this.authService.getCurrentUser().subscribe((user) => {
        // Handle the current user data here
        this.currentUser=user;
        console.log(this.currentUser);
        
      });
      this.getUsers();
  }
  
  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: resp => {
        this.userLength=resp.length;
        this.users=resp;
        console.log(this.userLength)
      },
      error: error => {
        console.log(error)
      }
    })
  }

  openDialog(name: String): void {
    if (!this.authService.isLoggedIn) {
      // Redirect to the login page
      this.router.navigate(['/login']);
    }
    else{
    if(this.dialogOpen)
    {return;}
    const dialogRef= this.dialog.open(DialogComponent, {
      width: '450px',
      maxHeight: '90%',
      disableClose: false, 
    });
    this.dialogOpen = true;


    dialogRef.afterClosed().subscribe(result => {
      if (result ===  true) {
        this.router.navigate(['/pseudocod', name]);
      } 
        this.dialogOpen=false;
      }
    );
    }
  }

  getQuizzes() {
    this.quizService.getAllQuizzes().subscribe({
      next: resp => {
        this.quizzes = resp;
        console.log(this.quizzes);
      },
      error: error => {
        console.log(error)
      }
    })
  }

  showQuizDetails(quizName:string,quiz:any){

    this.quizzes.forEach((q: any) => {
      if (q.name !== quizName) {
        q.showDetails = false;
      }
    });
    if (quizName == "Pseudocod")  {
      let usersTakenQuiz = 0;
      let passedUsers = 0;
      let totalBestGrade = 0;
      this.users.forEach((user: any) => {
        if (user.pseudocodPassed) {
          passedUsers++;
          
        }
        if (user.lastScorePseudocod > 0) {
          usersTakenQuiz++;
          totalBestGrade += user.maxScorePseudocod;
        }
      });
      const promovabilityRate = (passedUsers / this.userLength) * 100;
      const quizTakeRate = (usersTakenQuiz / this.userLength) * 100;
      this.promovabilityRate = promovabilityRate.toFixed(2);
      this.quizTakeRate = quizTakeRate.toFixed(2);
      this.mediumBestGrade = (totalBestGrade / usersTakenQuiz).toFixed(0);
    } else 
    if(quizName == "Algoritmi Elementari")
    {
      let usersTakenQuiz = 0;
      let passedUsers = 0;
      let totalBestGrade = 0;
      this.users.forEach((user: any) => {
        if (user.aePassed) {
          passedUsers++;
          
        }
        if (user.lastScoreAE > 0) {
          usersTakenQuiz++;
          totalBestGrade += user.maxScoreAE;
        }
      });
      const promovabilityRate = (passedUsers / this.userLength) * 100;
      const quizTakeRate = (usersTakenQuiz / this.userLength) * 100;
      this.promovabilityRate = promovabilityRate.toFixed(2);
      this.quizTakeRate = quizTakeRate.toFixed(2);
      this.mediumBestGrade = (totalBestGrade / usersTakenQuiz).toFixed(0);
    }
     else if(quizName == "Baze de Date")
     {
      let usersTakenQuiz = 0;
      let passedUsers = 0;
      let totalBestGrade = 0;
      this.users.forEach((user: any) => {
        if (user.bdPassed) {
          passedUsers++;
          
        }
        if (user.lastScoreBD > 0) {
          usersTakenQuiz++;
          totalBestGrade += user.maxScoreBD;
        }
      });
      const promovabilityRate = (passedUsers / this.userLength) * 100;
      const quizTakeRate = (usersTakenQuiz / this.userLength) * 100;
      this.promovabilityRate = promovabilityRate.toFixed(2);
      this.quizTakeRate = quizTakeRate.toFixed(2);
      this.mediumBestGrade = (totalBestGrade / usersTakenQuiz).toFixed(0);
    } else if(quizName == "Limbajul C++")
    {
      let usersTakenQuiz = 0;
      let passedUsers = 0;
      let totalBestGrade = 0;
      this.users.forEach((user: any) => {
        if (user.cppPassed) {
          passedUsers++;
          
        }
        if (user.lastScoreCpp > 0) {
          usersTakenQuiz++;
          totalBestGrade += user.maxScoreCpp;
        }
      });
      const promovabilityRate = (passedUsers / this.userLength) * 100;
      const quizTakeRate = (usersTakenQuiz / this.userLength) * 100;
      this.promovabilityRate = promovabilityRate.toFixed(2);
      this.quizTakeRate = quizTakeRate.toFixed(2);
      this.mediumBestGrade = (totalBestGrade / usersTakenQuiz).toFixed(0);
    } else if(quizName == "Siruri de caractere")
    { 
      let usersTakenQuiz = 0;
      let passedUsers = 0;
      let totalBestGrade = 0;
      this.users.forEach((user: any) => {
        if (user.scPassed) {
          passedUsers++;
          
        }
        if (user.lastScoreSC > 0) {
          usersTakenQuiz++;
          totalBestGrade += user.maxScoreSC;
        }
      });
      const promovabilityRate = (passedUsers / this.userLength) * 100;
      const quizTakeRate = (usersTakenQuiz / this.userLength) * 100;
      this.promovabilityRate = promovabilityRate.toFixed(2);
      this.quizTakeRate = quizTakeRate.toFixed(2);
      this.mediumBestGrade = (totalBestGrade / usersTakenQuiz).toFixed(0);
    } else if(quizName == "Tablouri Bidimensionale")
    {
      let usersTakenQuiz = 0;
      let passedUsers = 0;
      let totalBestGrade = 0;
      this.users.forEach((user: any) => {
        if (user.tbPassed) {
          passedUsers++;
          
        }
        if (user.lastScoreTB > 0) {
          usersTakenQuiz++;
          totalBestGrade += user.maxScoreTB;
        }
      });
      const promovabilityRate = (passedUsers / this.userLength) * 100;
      const quizTakeRate = (usersTakenQuiz / this.userLength) * 100;
      this.promovabilityRate = promovabilityRate.toFixed(2);
      this.quizTakeRate = quizTakeRate.toFixed(2);
      this.mediumBestGrade = (totalBestGrade / usersTakenQuiz).toFixed(0);
    } else if(quizName == "Recursivitate")
    {
      let usersTakenQuiz = 0;
      let passedUsers = 0;
      let totalBestGrade = 0;
      this.users.forEach((user: any) => {
        if (user.recPassed) {
          passedUsers++;
          
        }
        if (user.lastScoreRec > 0) {
          usersTakenQuiz++;
          totalBestGrade += user.maxScoreRec;
        }
      });
      const promovabilityRate = (passedUsers / this.userLength) * 100;
      const quizTakeRate = (usersTakenQuiz / this.userLength) * 100;
      this.promovabilityRate = promovabilityRate.toFixed(2);
      this.quizTakeRate = quizTakeRate.toFixed(2);
      this.mediumBestGrade = (totalBestGrade / usersTakenQuiz).toFixed(0);
    } else if(quizName == "Tablouri Unidimensionale")
    {
      let usersTakenQuiz = 0;
      let passedUsers = 0;
      let totalBestGrade = 0;
      this.users.forEach((user: any) => {
        if (user.tuPassed) {
          passedUsers++;
          
        }
        if (user.lastScoreTU > 0) {
          usersTakenQuiz++;
          totalBestGrade += user.maxScoreTU;
        }
      });
      const promovabilityRate = (passedUsers / this.userLength) * 100;
      const quizTakeRate = (usersTakenQuiz / this.userLength) * 100;
      this.promovabilityRate = promovabilityRate.toFixed(2);
      this.quizTakeRate = quizTakeRate.toFixed(2);
      this.mediumBestGrade = (totalBestGrade / usersTakenQuiz).toFixed(0);
    }

    quiz.showDetails =!quiz.showDetails
    
  }
 }

  