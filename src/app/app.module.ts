import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ResourcesComponent } from './resources/resources.component';
import { MatIconModule} from '@angular/material/icon';
import { PseudocodComponent } from './quiz-page/pseudocod.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './home/home.component';
import { DialogSubmitComponent } from './dialog-submit/dialog-submit.component';
import { UserComponent } from './user/user.component';
import { DeletedialogComponent } from './deletedialog/deletedialog.component';
import { ToastrModule } from 'ngx-toastr';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { AddUserComponent } from './adduser-register/adduser-register.component';
import { LoginComponent } from './login/login.component';

import { QuestionComponent } from './questions/question/question.component';
import { AddQuestionComponent } from './questions/add-question/add-question/add-question.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';






@NgModule({
  declarations: [
    AppComponent,
    ResourcesComponent,
    PseudocodComponent,
    DialogComponent,
    HomeComponent,
    DialogSubmitComponent,
    UserComponent,
    DeletedialogComponent,
    AddUserComponent,
    LoginComponent,
    QuestionComponent,
    AddQuestionComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatSelectModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
