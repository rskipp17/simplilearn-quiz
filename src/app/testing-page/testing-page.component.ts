import { Component, OnInit } from '@angular/core';
import { TestingService } from '../shared/testing.service'
import { Option, Question, Quiz } from '../models/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testing-page',
  templateUrl: './testing-page.component.html',
  styleUrls: ['./testing-page.component.css']
})
export class TestingPageComponent implements OnInit {
  quiz: Quiz = new Quiz(null);
  quizName: string;
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime: string;
  duration: string;
  durationSec: number;
  numQuestions: number;
  index: number;

  constructor(private ts: TestingService, private router:Router) { 
    this.quizName='data/100.json';
    this.loadQuiz(this.quizName);
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  loadQuiz(quizName: string) {
    this.ts.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.numQuestions = this.quiz.questions.length;
      this.index = 0;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.durationSec = 600; //600 second (10 minute) duration
      this.duration = this.parseTime(this.durationSec);
      this.timer = setInterval(() => { this.tick(); }, 1000);
    });
  }

  nextQuestion(){
    if (this.index + 2 > this.numQuestions)
    {
      this.exitQuiz();
    }
    this.index++;
  }

  exitQuiz()
  {
    clearInterval(this.timer);
    this.submit();
  }

  onSelect(question: Question, option: Option) {
      question.options.forEach((x) => {
        if (x.id !== option.id){
          x.selected = false; 
        }});
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.durationSec) {
      clearInterval(this.timer);
      this.exitQuiz();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  submit() {
    this.router.navigateByUrl('/results', { state: this.quiz });
  }
}