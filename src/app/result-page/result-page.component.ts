import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question, Quiz } from '../models';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  quiz;
 
  constructor(private router:Router) {
    this.quiz = this.router.getCurrentNavigation().extras.state;
    console.log(this.quiz);
  }

  ngOnInit(): void {
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };
}
