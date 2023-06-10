import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { quizData } from './quizData';
import { Observable } from 'rxjs/internal/Observable';
import { questionModelAPI } from '../service//questionModelAPI';

@Injectable({
  providedIn: 'root'
})
export class GameServiceApi {

  quizCollections: quizData[] = [];
  apiUrl: string = "https://wheel-api.onrender.com/questions";

  getData(): Observable<quizData[]> {
    return this.httpClient.get<quizData[]>(this.apiUrl);
  }

  pushData(record: questionModelAPI): Observable<questionModelAPI> {
    return this.httpClient.post<questionModelAPI>(this.apiUrl, record);
  }

  
  putData(record: questionModelAPI): Observable<questionModelAPI> {
    return this.httpClient.put<questionModelAPI>(this.apiUrl, record);
  }

  deleteData(record: quizData):Observable<questionModelAPI> {
    return this.httpClient.delete<questionModelAPI>(this.apiUrl + "/" + record.id);
  }


  topics: string[] = [];
  initializeTopics() {
    this.quizCollections.forEach(element => {
      if (this.topics.findIndex(topic => topic == element.topic) == -1) {
        this.topics.push(element.topic);
      }
    });
  }

  constructor(private httpClient: HttpClient) { }
}
