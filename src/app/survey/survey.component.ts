import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../custom-build/navbar/navbar.component";

@Component({
    selector: 'app-survey',
    standalone: true,
    imports: [RouterModule, NavbarComponent, CommonModule],
    templateUrl: './survey.component.html',
    styleUrl: './survey.component.css'
})

export class SurveyComponent {

}