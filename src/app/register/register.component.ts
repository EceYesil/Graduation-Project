import { Component } from '@angular/core';
import { NavbarComponent } from "../custom-build/navbar/navbar.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ RouterModule, CommonModule, NavbarComponent ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
