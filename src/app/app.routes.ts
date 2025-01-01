import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateSurveyComponent  } from './survey-create/survey-create.component';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent}, 
  { path: 'survey', component: SurveyComponent },
  { path: 'survey operations', component: CreateSurveyComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomeComponent]; // Export your components