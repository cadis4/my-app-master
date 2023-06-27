import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/models/question';
import { AuthService } from 'src/app/services/auth.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  questionId: any;
  question: Question = new Question();
  isEditMode: boolean=false;
  addEditQuestionForm!: FormGroup;
 quizzes:any
 

 
  constructor(private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,private quizService:QuizService,private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.authService.roleLoggedIn) {
      // Redirect to the login page
      this.router.navigate(['/home']);
    }
    this.questionId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.route.snapshot.data['isEditMode'];
    this.getQuizzes();

    if (this.isEditMode) {
      this.getQuestionById();
    }
    
    this.addEditQuestionForm = this.formBuilder.group({
      name: ["", Validators.required],
      answerOne: ["", Validators.required],
      answerTwo:["",Validators.required],
      answerThree:["",Validators.required],
      answerFour:["",Validators.required],
      correctAnswer:["",Validators.required],
      quiz:["",Validators.required]
    });
  }
  compareObjects(o1: any, o2: any) {
    return (o1.name == o2.name && o1.id == o2.id) ? true : false;
  }

  getQuizzes() {
    this.quizService.getAllQuizzes().subscribe({
      next: resp => {
        this.quizzes = resp;
      },
      error: error => {
        console.log(error)
      }
    })
  }

  get addQuestion(): any {
    return this.addEditQuestionForm.controls;
  }

  addOrEditQuestion() {
    if (this.addEditQuestionForm.valid) {
      let question: Question = {
        questionId: !this.isEditMode ? 0 : this.questionId,
        name:this.addQuestion.name.value,
       answerOne:this.addQuestion.answerOne.value,
       answerFour:this.addQuestion.answerFour.value,
       answerThree:this.addQuestion.answerThree.value,
       answerTwo:this.addQuestion.answerTwo.value,
       correctAnswer:this.addQuestion.correctAnswer.value,
       verifyAnswer:false,
       quiz:this.addQuestion.quiz.value
      }

      if (!this.isEditMode) {
        this.questionService.addQuestion(question).subscribe({
          next: () => {
            this.toastr.success("Question successfully added!");
            this.router.navigate(['/questions']);
          },
          error: (e) => {
            if (e.status === 700) {
              this.toastr.error(e.error);
            }
          }
        });
      } else {
        this.questionService.updateQuestion(question).subscribe({
          next: () => {
            this.toastr.success("Question successfully updated!");
            this.router.navigate(['/questions']);
          },
          error: () => {
             { 
              this.toastr.error("An error has occured");
            }
          }
        });
      }
    }
  }

  getQuestionById() {
    this.questionService.getQuestion(this.questionId).subscribe({
      next: resp => {
        this.question = {
          questionId: resp.questionId,
          name:resp.name,
       answerOne:resp.answerOne,
       answerFour:resp.answerFour,
       answerThree:resp.answerThree,
       answerTwo:resp.answerTwo,
       correctAnswer:resp.correctAnswer,
       verifyAnswer:resp.verifyAnswer,
       quiz:resp.quiz
        }
        console.log(this.question)
      },
      error: (e) => {
       {  e="Error";
          this.toastr.error(e.error);
        }
      }
    });
  }
 
}