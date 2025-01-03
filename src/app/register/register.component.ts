import { Component } from '@angular/core';
import { NavbarComponent } from "../custom-build/navbar/navbar.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ RouterModule, CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
    registerForm: FormGroup;  // Defines the form group (a collection of form controls)
    savedProfiles: any[] = [];  // Store profiles for viewing
  
    constructor(private fb: FormBuilder) {
      // Define form fields and validation rules
      this.registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],  // Must be a valid email
        a: ['', Validators.required],  // Username field must not be empty
        password: ['', Validators.required],  // Password field must not be empty
      });
    }
  
    // When the user submits the form
    onSubmit() {
      if (this.registerForm.valid) {
        const formData = {
          email: this.registerForm.get('email')?.value,
          a: this.registerForm.get('a')?.value,
          password: this.registerForm.get('password')?.value,
        };
    
        const existingProfiles = JSON.parse(localStorage.getItem('profiles') || '[]');
        existingProfiles.push(formData);
        localStorage.setItem('profiles', JSON.stringify(existingProfiles));
    
        alert('Registration successful!');
        this.registerForm.reset();
      }
    }
}
