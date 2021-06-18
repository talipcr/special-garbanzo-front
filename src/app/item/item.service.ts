import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.mongo';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  baseUrl = `${environment.apiUrl}/items`;

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}`);
  }

  getItemById(id: string): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/${id}`);
  }

  addItem(newItem: void): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, newItem);
  }

  updateItemById(id: string, updateItem: void): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, updateItem);
  }

  deleteItemById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  removeAll(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}`);
  }
}
