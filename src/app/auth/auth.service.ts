import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.mongo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/signup`, { email, password });
  }

  login(email: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/login`, { email, password });
  }

  reset(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/reset`, { email });
  }
}
