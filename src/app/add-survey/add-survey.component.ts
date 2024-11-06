import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Question {
  type: string;
  text: string;
  options?: { text: string, checked?: boolean }[];
  selected?: string;
  answer?: string;
}

@Component({
  selector: 'app-add-survey',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent {
  questionType: string = 'open-ended';
  questions: Question[] = [];

  constructor(private router: Router) {}

  addQuestion() {
    const newQuestion: Question = {
      type: this.questionType,
      text: '',
      options: this.questionType !== 'open-ended' ? [{ text: '' }] : undefined
    };
    this.questions.push(newQuestion);
  }

  addOption(questionIndex: number) {
    this.questions[questionIndex].options?.push({ text: '' });
  }

  removeOption(questionIndex: number, optionIndex: number) {
    this.questions[questionIndex].options?.splice(optionIndex, 1);
  }

  removeQuestion(questionIndex: number) {
    this.questions.splice(questionIndex, 1);
  }

  onSubmit() {
    console.log('Survey submitted:', this.questions);
    alert('Survey submitted successfully!');
    this.router.navigate(['/survey']); // Navigate to "Survey" page
  }
}