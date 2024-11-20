import { Routes } from '@angular/router';
import { CreateSurveyComponent  } from './survey-create/survey-create.component';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'survey', component: SurveyComponent },
    { path: 'survey operations', component: CreateSurveyComponent },
  ] },
  // other routes
];