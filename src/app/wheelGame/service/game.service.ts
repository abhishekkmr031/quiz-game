import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { questionModel } from '../management-component/questionModel';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  save(key:string, value:string){
    this.removeData(key);
    this.saveData(key, value);
  }

  getQuestions(){
    return this.getData
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }
  
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  constructor() { }
}
