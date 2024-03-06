import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  myLoginform!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myLoginform = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
    });
  }

  onFormSubmit() {
    console.log(this.myLoginform);
  }
}
