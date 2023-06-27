import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeletedialogComponent } from 'src/app/deletedialog/deletedialog.component';

import { QuestionService } from 'src/app/services/question.service';

import { Question } from 'src/app/models/question';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, AfterViewInit {

  questions:any;
  currentQuestion:any;
  thequestionId:number=0;
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  columnsToDisplay: string[] = ["name","quiz","actions"];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private authService:AuthService,private router:Router,private questionService: QuestionService,public dialog: MatDialog,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    if (!this.authService.roleLoggedIn) {
      // Redirect to the login page
      this.router.navigate(['/home']);
    }
    this.getQuestions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  applyFilter() {
    const filterValue = this.searchInput.nativeElement.value.trim().toLowerCase();
    // Apply your filtering logic using the filterValue
    if (filterValue) {
      const filteredQuestions = this.questions.filter((question: Question) => {
        const quizName = question.quiz.name.toLowerCase();
        return quizName.includes(filterValue);
      });
      // Assign the filtered questions to the dataSource.data property
      this.dataSource.data = filteredQuestions;
      // Update the paginator after filtering
      this.dataSource.paginator?.firstPage();
    } else {
      // No filter value, show all questions
      this.dataSource.data = this.questions;
      // Update the paginator
      this.dataSource.paginator?.firstPage();
    }
  }
  
  
  onDelete(question: Question): void {
    this.deleteQuestion(question);
  }

  deleteQuestion( question: any): void {
    const dialogRef = this.dialog.open(DeletedialogComponent);
    dialogRef.componentInstance.message = "Are you sure you want to delete this question ?";
    this.currentQuestion = question;
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteQuestionConfirmed();
    });
  }

  deleteQuestionConfirmed(): void {
    this.questionService.deleteQuestion(this.currentQuestion.questionId).subscribe({
      next: resp => {
        this.toastr.info("Question succesfully deleted");
        this.getQuestions();
      },
      error: error => {
        error="Question was not deleted";
        this.toastr.info(error);
      }
    });
  }
  
  
  getQuestions() {
    this.questionService.getAllQuestions().subscribe({
      next: resp => {
        console.log(resp);
        this.questions = resp;
        this.dataSource.data = resp;
        
      },
      error: error => {
        console.log(error);
      }
    });
  }
  
}