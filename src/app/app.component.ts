import { Component } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, LoginComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Lincsell-login';
  constructor(public authentication: AuthenticationService) {}
}
