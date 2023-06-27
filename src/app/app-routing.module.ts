import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcesComponent } from './resources/resources.component';
import { PseudocodComponent } from './quiz-page/pseudocod.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './adduser-register/adduser-register.component';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './questions/question/question.component';
import { AddQuestionComponent } from './questions/add-question/add-question/add-question.component';

const routes: Routes = [
 { path: '', 
  component: HomeComponent
 },
 { path: 'resources', 
   component: ResourcesComponent 
 },
 {
  path: 'pseudocod/:name',
  component: PseudocodComponent
 },{
  path: 'questions',
  component: QuestionComponent
 },
 {
  path: 'home',
  component: HomeComponent
 },
 {
  path: "add-user",
  component: AddUserComponent,
  data:{isEditMode: false,
    isAddEditMode:true
  }
},
{
  path: "user/:id",
  component: AddUserComponent,
  data: {
    isEditMode: true,
    isAddEditMode:true
  }
},
{
  path: "question/:id",
  component: AddQuestionComponent,
  data: {
    isEditMode: true,
  }
},
{
  path: "add-question",
  component: AddQuestionComponent,
  data: {
    isEditMode: false
  }
},
{
  path: "register",
  component: AddUserComponent,
  data: {
    isEditMode: false,
    isAddEditMode:false
  }
},
 {
  path: 'users',
  component: UserComponent
 },
 {
  path: 'login',
  component: LoginComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
