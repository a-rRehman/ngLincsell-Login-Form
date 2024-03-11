import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../service/authentication.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  LoginSuccess: boolean = false;
  isChecked: boolean = false;
  myLoginform!: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.myLoginform = new FormGroup({
      Username: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false),
    });
  }
  passwordToggle: boolean = false;
  togglePassword() {
    this.passwordToggle = !this.passwordToggle;
  }
  onFormSubmit() {
    if (this.myLoginform.valid) {
      this.authService.isLoader = true;
      const formData = this.myLoginform.value;
      console.log(this.myLoginform);
      this.authService.login(formData).subscribe(
        (response) => {
          this.authService.isLoader = false;

          // Success Handling
          console.log('Login successful:', response);
          console.log('Login successful:', response.success);
          if (response.data.error) {
            this.LoginSuccess = true;
          } else {
            this.LoginSuccess = false;
            this.authService.loginSuccessful = true;
          }
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
