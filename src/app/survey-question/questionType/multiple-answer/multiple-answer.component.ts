import { Component, Input, OnInit, AfterViewChecked, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-multiple-answer',
  imports: [
    FormsModule,
    ReactiveFormsModule
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
    this.addOption(); // Başlangıçta 4 seçenek ekle 
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
      label: [''],
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
    if (this.optionContainers && this.optionContainers.length) {
      const lastOptionElement = this.optionContainers.last.nativeElement;
      lastOptionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onSubmit(): void {
    console.log(this.questionForm.value);
  }

  getSelectedOptions(): string[] {
    return this.options.controls
      .filter(option => option.get('selected')?.value)
      .map(option => option.get('label')?.value);
  }

  // Soru silme buttonu 
  deleteQuestion(): void {
    if (this.remove) {
      this.remove(this.index);
    }
  }
}
