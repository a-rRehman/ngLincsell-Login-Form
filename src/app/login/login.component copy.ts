import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
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
  // constructor(private http: HttpClient) {}
  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {}

  // onFormSubmit() {
  //   if (this.myLoginform.valid) {
  //     const formData = this.myLoginform.value;
  //     const headers = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Wlid: '94DE1528-DE42-498A-A07E-4A458E97240E',
  //     });
  //     this.http
  //       .post('https://lsapim.azure-api.net/auth-svc/api/SignIn', formData, {
  //         headers,
  //       })
  //       .subscribe(
  //         (response) => {
  //           // Success Handeling
  //           console.log('Login successful:', response);
  //         },
  //         (error) => {
  //           // Error Handeling
  //           console.error('Login failed:', error);
  //         }
  //       );
  //   } else {
  //     console.log('Form Has Validation Errors');
  //   }
  // }

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
