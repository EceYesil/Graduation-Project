import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from "../custom-build/navbar/navbar.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Create login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email input
      password: ['', Validators.required],  // Password input
    });
  }

  // Check login
  onLogin() {
    const { email, password } = this.loginForm.value;  // Get form values
    const savedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');  // Get saved profiles

    console.log('Entered Email:', email);
    console.log('Saved Profiles:', savedProfiles);  // Debugging
    
    const user = savedProfiles.find(
      (profile: any) => profile.email === email && profile.password === password
    );

    if (user) {
      alert(`Welcome back, ${user.a}!`);
    } else {
      alert('Invalid email or password!');
    }
  }
}