import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  login(data: any) {
    return this.http.post(
      `${environment.apiUrl}/api/auth/login`,
      data
    );
  }
}