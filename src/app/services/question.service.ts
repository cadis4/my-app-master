import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Question } from "../models/question";


@Injectable({providedIn: 'root'})
export class QuestionService{
    header = {
        headers: {
            'Content-Type': 'application/json',
            'responseType' : 'text'
        }
    }
    protected apiURL = "https://localhost:7275/api/Question";
    constructor(protected http: HttpClient) {
    }

    getAllQuestions() {
        return this.http.get<Question[]>(`${this.apiURL}/getAllQuestions`)
    } 

    addQuestion(question: Question){
        return this.http.post<Question>(`${this.apiURL}/addQuestion`, question)
    }

    updateQuestion(question: Question) {
        return this.http.put(`${this.apiURL}/updateQuestion`, question, this.header);
    }

    deleteQuestion(id: number) {
        return this.http.delete(`${this.apiURL}/${id}`)
      }

    getQuestionsByQuizName(name: String) {
        return this.http.get<Question[]>(`${this.apiURL}/getAllQuestionsByQuizName/${name}`)
    } 

    getQuestion(id: number) {
        return this.http.get<Question>(`${this.apiURL}/getQuestion/${id}`)
      }
}