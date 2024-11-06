import { Component, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  styleUrls: ['./add-survey.component.css'],
  animations: [
    trigger('slideDown', [
      state('void', style({ height: '0px', opacity: 0 })),
      state('*', style({ height: '*', opacity: 1 })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ])
  ]
})
export class AddSurveyComponent implements AfterViewChecked {
  questionType: string = '';
  questions: Question[] = [];
  private scrollToLastQuestion: boolean = false;

  constructor(private router: Router) {}

  addQuestion() {
    if (!this.questionType) {
      return; // Do not add a question if questionType is not selected
    }
    const newQuestion: Question = {
      type: this.questionType,
      text: '',
      options: this.questionType !== 'open-ended' ? Array(4).fill({ text: '' }) : undefined,
      answer: this.questionType === 'open-ended' ? '' : undefined
    };
    this.questions.push(newQuestion);
    this.scrollToLastQuestion = true;
    this.questionType = ''; // Reset question type after adding a question
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

  ngAfterViewChecked() {
    if (this.scrollToLastQuestion) {
      const lastQuestionElement = document.getElementById(`question-${this.questions.length - 1}`);
      if (lastQuestionElement) {
        lastQuestionElement.scrollIntoView({ behavior: 'smooth' });
        this.scrollToLastQuestion = false;
      }
    }
  }
}