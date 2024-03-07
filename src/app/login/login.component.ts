import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  myLoginform!: FormGroup;

  ngOnInit(): void {
    this.myLoginform = new FormGroup({
      Username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      Password: new FormControl('', Validators.required),
    });
  }

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {}

  onFormSubmit() {
    if (this.myLoginform.valid) {
      const formData = this.myLoginform.value;
      this.authService.login(formData).subscribe(
        (response) => {
          // Success Handling
          console.log('Login successful:', response);
        },
        (error) => {
          // Error Handling
          console.error('Login failed:', error);
        }
      );
    } else {
      console.log('Form Has Validation Errors');
    }
  }
}
