// authentication.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'https://lsapim.azure-api.net/auth-svc/api/SignIn';
  private wlid = '94DE1528-DE42-498A-A07E-4A458E97240E';

  constructor(private http: HttpClient) {}

  login(formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Wlid: this.wlid,
    });
    return this.http.post(this.apiUrl, formData, { headers });
  }
}
