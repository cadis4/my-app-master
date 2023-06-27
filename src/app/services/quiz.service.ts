import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Quiz } from "../models/quiz.model";

@Injectable({providedIn: 'root'})
export class QuizService {

    protected apiURL = "https://localhost:7275/api/Quiz"
    constructor(protected http: HttpClient) {
    }

    getAllQuizzes() {
        return this.http.get<Quiz[]>(`${this.apiURL}/getAllQuizzes`)
    }

    // getLocation(id: number) {
    //     return this.http.get<Location>(`${this.apiURL}/getLocation/${id}`)
    // }

    // addLocation(location: Location) {
    //     return this.http.post(`${this.apiURL}/addLocation`, location)
    // }
}