import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SingleAnswerQuestion} from "../survey-question/questionType/single-answer/single-answer.component";
import { MultipleQuestionComponent } from  "../survey-question/questionType/multiple-answer/multiple-answer.component"; 
import { OpenEndedQuestionComponent } from "../survey-question/questionType/openended-answer/openended-answer.component";

interface Question {
  type: string;
  text: string;
  options?: { text: string, checked?: boolean }[];
  selected?: string;
  answer?: string;
}

@Component({
  selector: 'app-create-survey',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.css'],
  standalone: true,
  imports: [SingleAnswerQuestion,MultipleQuestionComponent,OpenEndedQuestionComponent,CommonModule, FormsModule]
})
export class CreateSurveyComponent implements OnInit {
  @Input() edit = false;
  @Input() formId: string | null = null;

  model: any = {};
  errors: any = {};
  items: any[] = [];
  selectedQuestionTypes: string[] = []; // Selected question types
  questions: Question[] = [];
  scrollToLastQuestion = false;

  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.items = [
      { buttonText: 'Single Choice', value: 'Single Choice' },
      { buttonText: 'Multiple Choice', value: 'Multiple Choice' },
      { buttonText: 'Open-ended', value: 'Open-ended' },
    ];
  }

  onOptionChange(event: Event, questionType: string) {
    event.preventDefault();
    this.selectedQuestionTypes.push(questionType);
    this.scrollToNewQuestion();
  }

  removeQuestion(index: number): void {
    this.selectedQuestionTypes.splice(index, 1);
  }

  private scrollToNewQuestion() {
    if (this.scrollTarget) {
      this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onSubmit() {
    console.log('Survey submitted:', this.questions);
    alert('Survey submitted successfully!');
    this.router.navigate(['/survey']); // Navigate to "Survey" page
  }

  onEditFormLoaded(data: any) {
    this.model = data;
    this.model.formId = this.formId;
  }

  onSave() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onError(err: any) {
    this.errors = err.json?.error?.fields;
  }
}