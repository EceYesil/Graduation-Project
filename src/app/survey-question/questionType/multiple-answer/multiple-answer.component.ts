import { Component, OnInit, AfterViewChecked, ElementRef, ViewChildren, QueryList, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-multiple-answer',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: 'multiple-answer.component.html',
})
export class MultipleQuestionComponent implements OnInit, AfterViewChecked {
  @Input() index: number = 0;
  @Input() remove: (index: number) => void = () => {};

  @ViewChildren('optionContainer') optionContainers!: QueryList<ElementRef>;

  questionForm: FormGroup;
  private hasNewOption: boolean = false;

  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      options: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.addOption();
    this.addOption();
    this.addOption();
    this.addOption(); // Adds 4 options initially.
  }

  ngAfterViewChecked(): void {
    if (this.hasNewOption) {
      this.scrollToLastOption();
      this.hasNewOption = false;
    }
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  createOption(): FormGroup {
    return this.fb.group({
      value: [''],
      selected: [false],
    });
  }

  addOption(): void {
    this.options.push(this.createOption());
    this.hasNewOption = true;
  }

  removeOption(): void {
    const optionsLength = this.options.length;
    if (optionsLength > 1) {
      this.options.removeAt(optionsLength - 1);
    }
  }

  scrollToLastOption(): void {
    console.log('outer');
    if (this.optionContainers && this.optionContainers.length) {
      const lastOptionElement = this.optionContainers.last.nativeElement;
      lastOptionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  onOptionSelect(index: number): void {
    this.options.controls.forEach((control, i) => {
      control.get('selected')?.setValue(i === index);
    });
  }
}
