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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CustomValidators } from '../Validators/noSpaceAllowded.validator';

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
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  invalidEmail: boolean = false;
  LoginSuccess: boolean = false;
  isChecked: boolean = false;
  myLoginform!: FormGroup;
  LoginScreen: boolean = true;
  ForgetScreen: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  myLoginformForget!: FormGroup;
  ngOnInit(): void {
    this.myLoginform = new FormGroup({
      Username: new FormControl(
        '',
        [
          Validators.required,
          Validators.email,
          CustomValidators.noSpaceAllowded,
        ],
        CustomValidators.checkingUserName
      ),
      Password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false),
    });

    //Adding forget Password functionality
    this.myLoginformForget = new FormGroup({
      Username: new FormControl('', [Validators.required, Validators.email]),
    });

    // Check if there are saved credentials
    const savedCredentials = JSON.parse(
      localStorage.getItem('savedCredentials') || '{}'
    );
    if (savedCredentials && savedCredentials.rememberMe) {
      this.myLoginform.patchValue({
        Username: savedCredentials.Username,
        Password: savedCredentials.Password,
        rememberMe: true,
      });
    }
  }
  showTopCenter() {
    this.messageService.add({
      key: 'bc',
      severity: 'success',
      summary: 'Success',
      detail: 'Email has been sent on provided email. Please check your email!',
    });
  }
  forgetPass() {
    this.LoginScreen = false;
    this.ForgetScreen = true;
  }

  backLogin() {
    this.LoginScreen = true;
    this.ForgetScreen = false;
  }
  passwordToggle: boolean = false;
  togglePassword() {
    this.passwordToggle = !this.passwordToggle;
  }

  onFormSubmit() {
    // if (this.myLoginform.valid) {
    this.authService.isLoader = true;
    const formData = this.myLoginform.value;
    console.log(this.myLoginform);
    // --Adding remeber me functionality
    // Save credentials if "Remember Me" is checked
    if (this.myLoginform.value.rememberMe) {
      localStorage.setItem(
        'savedCredentials',
        JSON.stringify(this.myLoginform.value)
      );
    } else {
      // If not checked, clear saved credentials
      localStorage.removeItem('savedCredentials');
    }
    //----------------------------------
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
    // } else {
    //   console.log('Form Has Validation Errors');
    // }
  }

  onFormSubmitForget() {
    if (this.myLoginformForget.valid) {
      this.authService.isLoader = true;
      console.log(this.myLoginformForget);
      const FormDataForget = this.myLoginformForget.value;
      this.authService.forgetPassword(FormDataForget).subscribe(
        (response) => {
          console.log('Success Response : ', response);
          this.authService.isLoader = false;
          if (response.data) {
            this.invalidEmail = false;
            this.showTopCenter();
          } else {
            this.invalidEmail = true;
          }
        },
        (error) => {
          console.log('Error Response :', error);
        }
      );
    } else {
      console.log('Form Has Validation Errors');
    }
  }
}
