import { Component, OnInit } from '@angular/core';
import { GameServiceApi } from '../service/game-service-api.service';
import { quizData } from '../service/quizData';

@Component({
  selector: 'app-management-component',
  templateUrl: './management-component.component.html',
  styleUrls: ['./management-component.component.scss']
})
export class ManagementComponentComponent implements OnInit {

  public inputQuestion: string = "";
  public inputTopic:string = "";
  public inputQuestionId: number = -1;
  public questionList: quizData[] = [];

  saveQuestion(){
    if(this.IsNullInput()) alert("Please enter Question and Topic Value to Save");
    else{
      let loadingAnimation = document.getElementById("loading-animation");
      if(loadingAnimation != undefined) loadingAnimation.style.display = "block";
      if(this.inputQuestionId == -1){
        console.log("-1 saving");
        let calculatedId = this.questionList.concat().pop()?.id;
        if(calculatedId!=undefined)this.service.pushData({id:calculatedId+1, topic:this.inputTopic, question:this.inputQuestion })
        .subscribe(data=>{
          console.log(data);
          this.getQuestion();
          if(loadingAnimation != undefined) loadingAnimation.style.display = "none";
        });
      }
      else
        this.service.putData({id:this.inputQuestionId, topic:this.inputTopic, question:this.inputQuestion })
        .subscribe(data=>{
          console.log(data);
          this.getQuestion();
          if(loadingAnimation != undefined) loadingAnimation.style.display = "none";
        });
    }

    this.resetForm();       
  }

  editQuestion(question:quizData){
    this.inputQuestion = question.question
    this.inputTopic = question.topic
    this.inputQuestionId = question.id;
  }

  deleteQuestion(question:quizData){
    this.service.deleteData(question).subscribe(data=>{
      console.log(data);
      this.getQuestion();
    });
  }


  private resetForm() {
    this.inputQuestion = "";
    this.inputTopic = "";
    this.inputQuestionId = -1;
  }

  IsNullInput():boolean{
    if(this.inputQuestion==="" || this.inputTopic==="") return true;
    return false;
  }

  constructor(private service: GameServiceApi) {}

  ngOnInit(): void { 
    this.getQuestion();
  }
  
  getQuestion(){
    this.service.getData()
    .subscribe(data=>this.questionList = data);
  }

}
