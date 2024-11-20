import { Component, Input, OnInit, AfterViewChecked, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-openended-answer',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: 'openended-answer.component.html',
})
export class OpenEndedQuestionComponent implements OnInit, AfterViewChecked {
  @Input() index: number = 0;
  @Input() remove: (index: number) => void = () => {};

  @ViewChild('scrollTarget') scrollTarget!: ElementRef;
  questionForm: FormGroup;
  private needsScroll: boolean = false;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }

  ngOnInit() {}

  ngAfterViewChecked(): void {
    if (this.needsScroll) {
      this.scrollToTarget();
      this.needsScroll = false;
    }
  }

  onSubmit() {
    console.log(this.questionForm.value);
  }

  deleteQuestion(): void {
    if (this.remove) {
      this.remove(this.index);
    }
  }

  private scrollToTarget(): void {
    if (this.scrollTarget) {
      this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
