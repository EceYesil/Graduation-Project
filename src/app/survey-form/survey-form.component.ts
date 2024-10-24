import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Question {
  type: string;
  text: string;
  options?: { text: string, checked?: boolean }[];
  selected?: string;
  answer?: string;
}

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SurveyFormComponent {
  questionType: string = 'open-ended';
  questions: Question[] = [];

  addQuestion() {
    const newQuestion: Question = {
      type: this.questionType,
      text: '',
      options: this.questionType !== 'open-ended' ? Array(4).fill({ text: '' }) : undefined
    };
    this.questions.push(newQuestion);

    // Scroll to the bottom of the page
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 0);
  }

  onSubmit() {
    console.log('Survey submitted:', this.questions);
    alert('Survey submitted successfully!');
  }
}
