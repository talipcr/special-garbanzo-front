import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.mongo';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  baseUrl: string = `${environment.apiUrl}/items`;

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<void> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  getItemById(id: string): Observable<void> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  addItem(newItem: any): Observable<void> {
    return this.http.post<any>(`${this.baseUrl}`, newItem);
  }
  updateItemById(id: string, updateItem: any): Observable<void> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, updateItem);
  }
  deleteItemById(id: string): Observable<void> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
