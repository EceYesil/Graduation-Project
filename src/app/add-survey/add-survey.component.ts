// add-survey.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

interface Question {
  type: string;
  text: string;
  options?: { text: string, checked?: boolean }[];
  selected?: string;
  answer?: string;
  imports: [BrowserModule, FormsModule]
}

@Component({
  selector: 'app-add-survey',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css'],  

})

export class AddSurveyComponent {
  questionType: string = 'open-ended';
  questions: Question[] = [];
  
  constructor(private router: Router) {}

  addQuestion() {
    const newQuestion: Question = {
      type: this.questionType,
      text: '',
      options: this.questionType !== 'open-ended' ? Array(4).fill({ text: '' }) : undefined,
      imports: [BrowserModule, FormsModule]
    };
    this.questions.push(newQuestion);
  }

  onSubmit() {
    console.log('Survey submitted:', this.questions);
    alert('Survey submitted successfully!');
    this.router.navigate(['/survey']); // Navigate to "Survey" page
  }
}
