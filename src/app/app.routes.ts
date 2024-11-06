import { Routes } from '@angular/router';
import { AddSurveyComponent  } from './add-survey/add-survey.component';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'survey', component: SurveyComponent },
    { path: 'add-survey', component: AddSurveyComponent },
  ] },
  // other routes
];