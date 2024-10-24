// app.component.ts
import { Component } from '@angular/core';
import { SurveyFormComponent } from './survey-form/survey-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [SurveyFormComponent] // Import SurveyFormComponent here
})
export class AppComponent {
  title = 'survey-app';
}
