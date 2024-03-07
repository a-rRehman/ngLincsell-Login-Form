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
  isChecked: boolean = false;
  myLoginform!: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.myLoginform = new FormGroup({
      Username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      Password: new FormControl('', Validators.required),
    });
  }
  passwordToggle: boolean = false;
  togglePassword() {
    this.passwordToggle = !this.passwordToggle;
  }
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
