import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormArray, FormsModule } from '@angular/forms';
import { DateFilterFn, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { SingleAnswerQuestion} from "../survey-question/questionType/single-answer/single-answer.component";
import { MultipleQuestionComponent } from  "../survey-question/questionType/multiple-answer/multiple-answer.component"; 
import { OpenEndedQuestionComponent } from "../survey-question/questionType/openended-answer/openended-answer.component";
import { NgForm } from '@angular/forms';
import { NavbarComponent } from "../custom-build/navbar/navbar.component";

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
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    SingleAnswerQuestion,
    MultipleQuestionComponent,
    OpenEndedQuestionComponent,
    NavbarComponent
]
})
export class CreateSurveyComponent implements OnInit {
  @Input() edit = false;
  @Input() formId: string | null = null;

  model: any = {};
  errors: any = {};
  items: any[] = [];
  selectedQuestionTypes: string[] = []; // Selected question types
  questions: FormArray;
  scrollToLastQuestion = false;
  dateFilter: DateFilterFn<any> | undefined;

  validateDates(form: NgForm) {
    const startDate = form.value.startDate;
    const endDate = form.value.endDate;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      alert('End date cannot be earlier than start date.');
      form.controls['endDate'].setErrors({ 'incorrect': true });
    }
  }

  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.questions = this.fb.array([]); 
  }

  ngOnInit() {

    this.model = this.fb.group({
      questions: this.questions
    });
    
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