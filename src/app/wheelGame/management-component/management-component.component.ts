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
  public inputTopic: string = "";
  public inputQuestionId: number = -1;
  public questionList: quizData[] = [];

  saveQuestion() {
    if (this.IsNullInput()) alert("Please enter Question and Topic Value to Save");
    else {
      if (this.inputQuestionId == -1) {
        this.loadAnimation();
        console.log("-1 saving");
        let calculatedId = this.questionList.concat().pop()?.id;
        if (calculatedId != undefined) this.service.pushData({ id: calculatedId + 1, topic: this.inputTopic, question: this.inputQuestion })
          .subscribe(data => {
            console.log(data);
            this.getQuestion();
            this.unloadAnimation();
          });
      }
      else
        this.service.putData({ id: this.inputQuestionId, topic: this.inputTopic, question: this.inputQuestion })
          .subscribe(data => {
            console.log(data);
            this.getQuestion();
            this.unloadAnimation();
          });
    }

    this.resetForm();
  }

  loadAnimation() {
    let modal = document.getElementById("#modal");
    if (modal !== null) modal.style.display = "flex";

    // let loadingAnimation = document.getElementById("loading-animation");
    // if (loadingAnimation != undefined) loadingAnimation.style.display = "block";

    // let entrybox = document.getElementById("question");
    // if (entrybox != undefined) entrybox.style.display = "none";

  };

  unloadAnimation() {
    let modal = document.getElementById("#modal");
    if (modal !== null) modal.style.display = "none";

    // let loadingAnimation = document.getElementById("loading-animation");
    // if (loadingAnimation != undefined) loadingAnimation.style.display = "none";

    // let entrybox = document.getElementById("question");
    // if (entrybox != undefined) entrybox.style.display = "block";
  }

  editQuestion(question: quizData) {
    this.inputQuestion = question.question
    this.inputTopic = question.topic
    this.inputQuestionId = question.id;
  }

  deleteQuestion(question: quizData) {
    this.loadAnimation();
    this.service.deleteData(question).subscribe(data => {
      console.log(data);
      this.getQuestion();
      this.unloadAnimation();
    });
  }


  private resetForm() {
    this.inputQuestion = "";
    this.inputTopic = "";
    this.inputQuestionId = -1;
  }

  IsNullInput(): boolean {
    if (this.inputQuestion === "" || this.inputTopic === "") return true;
    return false;
  }

  constructor(private service: GameServiceApi) { }

  ngOnInit(): void {
    this.loadAnimation();
    this.getQuestion();
  }

  getQuestion() {
    this.service.getData()
      .subscribe(data => {
        this.questionList = data;
        this.unloadAnimation();
      });
  }

}
