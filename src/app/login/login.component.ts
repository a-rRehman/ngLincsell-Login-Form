import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule,
    ReactiveFormsModule,
   
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  myLoginform!: FormGroup;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.myLoginform = new FormGroup({
      Username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      Password: new FormControl('', Validators.required),
    });
  }

  onFormSubmit() {
    console.log(this.myLoginform.value);
    console.log(this.myLoginform.get('Username')?.errors);
  }
}
