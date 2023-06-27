import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../models/quiz.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogSubmitComponent } from '../dialog-submit/dialog-submit.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pseudocod',
  templateUrl: './pseudocod.component.html',
  styleUrls: ['./pseudocod.component.css']
})
export class PseudocodComponent   implements OnInit {

  updatedQuestion = new Question();
  quizzes : Quiz[]=[];
  questions : Question[]=[];
  isSubmited:boolean=false;
  QuizForm = FormGroup;
  quizzz = new Quiz();
  @ViewChild('quizForm', { static: true }) quizForm!: ElementRef<HTMLFormElement>;
  quizName: any;
  allQuestions:any;
  verifiedQuestions:any;
  verifiedQuestionsCount:number=0;
  dialogOpen:boolean=false;
  showContainer = false;
  currentPassed:any;

  constructor(private userService: UserService,  
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private dialog: MatDialog,
    private route: ActivatedRoute,private renderer: Renderer2,private authService: AuthService,private router: Router){}
    currentUser:any;
    currentGrade:any;
    currentMaxGrade:any;
  ngOnInit(): void {
    this.quizName = this.route.snapshot.paramMap.get('name'); 
    this.getQuestions(this.quizName);
    this.resetquiz();
    this.authService.getCurrentUser().subscribe((user) => {
      // Handle the current user data here
      this.currentUser=user;
      console.log(this.currentUser);
      if(this.quizName == "Pseudocod")
      { 
       this.currentGrade=this.currentUser.lastScorePseudocod;
       this.currentMaxGrade=this.currentUser.maxScorePseudocod;
       this.currentPassed=this.currentUser.pseudocodPassed;
      } else 
      if(this.quizName == "Algoritmi Elementari")
      {  
       this.currentGrade=this.currentUser.lastScoreAE;
       this.currentMaxGrade=this.currentUser.maxScoreAE;
       this.currentPassed=this.currentUser.aePassed;
      }
       else if(this.quizName == "Baze de Date")
      { console.log(this.currentUser.bdPassed)
       this.currentGrade=this.currentUser.lastScoreBD;
       this.currentMaxGrade=this.currentUser.maxScoreBD;
       this.currentPassed=this.currentUser.bdPassed;
       console.log(this.currentMaxGrade)
      } else if(this.quizName == "Limbajul C++")
      { 
       this.currentGrade=this.currentUser.lastScoreCpp;
       this.currentMaxGrade=this.currentUser.maxScoreCpp;
       this.currentPassed=this.currentUser.cppPassed;
      } else if(this.quizName == "Siruri de caractere")
      { 
      
       this.currentGrade=this.currentUser.lastScoreSC;
       this.currentMaxGrade=this.currentUser.maxScoreSC;
       this.currentPassed=this.currentUser.scPassed;
      } else if(this.quizName == "Tablouri Bidimensionale")
      {
       this.currentGrade=this.currentUser.lastScoreTB;
       this.currentMaxGrade=this.currentUser.maxScoreTB;
       this.currentPassed=this.currentUser.tbPassed;
      } else if(this.quizName == "Recursivitate")
      { 
       
       this.currentGrade=this.currentUser.lastScoreRec;
       this.currentMaxGrade=this.currentUser.maxScoreRec;
       this.currentPassed=this.currentUser.recPassed;
       
      } else if(this.quizName == "Tablouri Unidimensionale")
      { 
       this.currentGrade=this.currentUser.lastScoreTU;
       this.currentMaxGrade=this.currentUser.maxScoreTU;
       this.currentPassed=this.currentUser.tuPassed;
      }
      
    });
    
   } 
  
  verifAnswer(answer: string, question: Question){
    if(answer == question.correctAnswer)
      question.verifyAnswer = true;
      else question.verifyAnswer =false;
      this.questionService.updateQuestion(question).subscribe({
        next: () => {
        },
        error: (e) => {
          console.log(e)
        }
      })
    }
   
    countCheckedRadioButtons(): number {
      let count = 0;
      const radioButtons = this.quizForm.nativeElement.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
      
      radioButtons.forEach((radioButton: HTMLInputElement) => {
        if (radioButton.checked) {
          count++;
        }
      });
      return count;
    }

    countTotalRadioButtons(): number {
      const radioButtons = document.querySelectorAll('input[type="radio"]');
      return radioButtons.length;
    }

    openDialog(){

      const totalRadioButtons = this.countTotalRadioButtons();
      if (this.countCheckedRadioButtons()!=totalRadioButtons/4) {
         alert('Please answer all questions before submitting.');
         return;
      }

      const dialogRef= this.dialog.open(DialogSubmitComponent, {
        width: '450px',
        maxHeight: '90%',
        disableClose: false, 
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.dialogOpen = false;
        if (result === true) {
          this.submited();
        }
      });
    }

    submited() {
      this.isSubmited = true;
      this.questionService.getAllQuestions().subscribe({
        next: (resp: Question[]) => {
          this.allQuestions = resp;
          if (this.allQuestions) {
            this.verifiedQuestionsCount = this.allQuestions.filter((question: Question) => question.verifyAnswer).length;
          }
          this.updateGrades()
        },
        error: error => {
          console.log(error);
        }
      });
    }

    updateGrades()
    {
      console.log('this.currentUser:', this.currentUser)
      if(this.quizName == "Pseudocod")
      { console.log("a intrat pe pseudocod") 
      if(this.currentUser.maxScorePseudocod<this.verifiedQuestionsCount)
        this.currentUser.maxScorePseudocod=this.verifiedQuestionsCount;
        if(this.verifiedQuestionsCount>4)
            this.currentUser.pseudocodPassed=true;
       this.currentUser.lastScorePseudocod = this.verifiedQuestionsCount;
       this.currentGrade=this.currentUser.lastScorePseudocod;
       this.currentMaxGrade=this.currentUser.maxScorePseudocod;
       this.currentPassed=this.currentUser.pseudocodPassed;
      } else 
      if(this.quizName == "Algoritmi Elementari")
      {   console.log("a intrat pe algoritmi")
        if(this.currentUser.maxScoreAE<this.verifiedQuestionsCount)
        this.currentUser.maxScoreAE=this.verifiedQuestionsCount;
        if(this.verifiedQuestionsCount>4)
            this.currentUser.aePassed=true;
       this.currentUser.lastScoreAE = this.verifiedQuestionsCount;
       this.currentGrade=this.currentUser.lastScoreAE;
       this.currentMaxGrade=this.currentUser.maxScoreAE;
       this.currentPassed=this.currentUser.aePassed;
      }
       else if(this.quizName == "Baze de Date")
      { console.log("a intrat pe bd")
      console.log(this.currentUser.maxScoreBD)
        if(this.currentUser.maxScoreBD<this.verifiedQuestionsCount)
        this.currentUser.maxScoreBD=this.verifiedQuestionsCount;
        if(this.verifiedQuestionsCount>4)
            this.currentUser.bdPassed=true;
       this.currentUser.lastScoreBD = this.verifiedQuestionsCount;
       this.currentGrade=this.currentUser.lastScoreBD;
       this.currentMaxGrade=this.currentUser.maxScoreBD;
       this.currentPassed=this.currentUser.bdPassed;
       console.log(this.currentMaxGrade)
      } else if(this.quizName == "Limbajul C++")
      { console.log("a intrat pe c++") 
        if(this.currentUser.maxScoreCpp<this.verifiedQuestionsCount)
        this.currentUser.maxScoreCpp=this.verifiedQuestionsCount;
        if(this.verifiedQuestionsCount>4)
            this.currentUser.cppPassed=true;
       this.currentUser.lastScoreCpp = this.verifiedQuestionsCount;
       this.currentGrade=this.currentUser.lastScoreCpp;
       this.currentMaxGrade=this.currentUser.maxScoreCpp;
       this.currentPassed=this.currentUser.cppPassed;
      } else if(this.quizName == "Siruri de caractere")
      { console.log("a intrat pe siruri") 
      
      if(this.currentUser.maxScoreSC<this.verifiedQuestionsCount)
        this.currentUser.maxScoreSC=this.verifiedQuestionsCount;
        if(this.verifiedQuestionsCount>4)
            this.currentUser.scPassed=true;
       this.currentUser.lastScoreSC = this.verifiedQuestionsCount;
       this.currentGrade=this.currentUser.lastScoreSC;
       this.currentMaxGrade=this.currentUser.maxScoreSC;
       this.currentPassed=this.currentUser.scPassed;
      } else if(this.quizName == "Tablouri Bidimensionale")
      { console.log("a intrat pe tablouri bi") 
      
      if(this.currentUser.maxScoreTB<this.verifiedQuestionsCount)
        this.currentUser.maxScoreTB=this.verifiedQuestionsCount;
        if(this.verifiedQuestionsCount>4)
            this.currentUser.tbPassed=true;
       this.currentUser.lastScoreTB = this.verifiedQuestionsCount;
       this.currentGrade=this.currentUser.lastScoreTB;
       this.currentMaxGrade=this.currentUser.maxScoreTB;
       this.currentPassed=this.currentUser.tbPassed;
      } else if(this.quizName == "Recursivitate")
      { 
        console.log("a intrat pe recursivitate") 
        if(this.currentUser.maxScoreRec<this.verifiedQuestionsCount)
        this.currentUser.maxScoreRec=this.verifiedQuestionsCount;
        if(this.verifiedQuestionsCount>4)
            this.currentUser.recPassed=true;
       this.currentUser.lastScoreRec = this.verifiedQuestionsCount;
       this.currentGrade=this.currentUser.lastScoreRec;
       this.currentMaxGrade=this.currentUser.maxScoreRec;
       this.currentPassed=this.currentUser.recPassed;
       
      } else if(this.quizName == "Tablouri Unidimensionale")
      { console.log("a intrat pe tab uni") 
        if(this.currentUser.maxScoreTU<this.verifiedQuestionsCount)
        this.currentUser.maxScoreTU=this.verifiedQuestionsCount;
        if(this.verifiedQuestionsCount>4)
            this.currentUser.tuPassed=true;
       this.currentUser.lastScoreTU = this.verifiedQuestionsCount;
       this.currentGrade=this.currentUser.lastScoreTU;
       this.currentMaxGrade=this.currentUser.maxScoreTU;
       this.currentPassed=this.currentUser.tuPassed;
      }
      this.userService.updateUserWithGrades(this.currentUser).subscribe(() => {
        console.log('User grades updated successfully');
      }, (error) => {
        console.log('Error updating user grades:', error);
      });
    
      console.log(this.currentUser)
    }

    
   deselectAllRadioButtons() {
    const radioButtons = this.quizForm.nativeElement.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
     radioButtons.forEach((radioButton: HTMLInputElement) => {
     this.renderer.setProperty(radioButton, 'checked', false);
     });
   }

   resetquiz()
    { this.isSubmited=false;
      this.questionService.getAllQuestions().subscribe({
        next: resp => {
          this.allQuestions = resp;
          this.allQuestions.forEach((question: Question) => {
        question.verifyAnswer =false;
        this.questionService.updateQuestion(question).subscribe({
          next: () => {
          },
          error: (e) => {
            console.log(e)
          }
        })
      });
        },
        error: error => {
          console.log(error)
        }
      })
      this.verifiedQuestionsCount=0;
      this.deselectAllRadioButtons();
    
    }

  getQuestions(quizName: String) {
    this.questionService.getQuestionsByQuizName(quizName).subscribe({
      next: resp => {
        this.questions = resp;
     
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
