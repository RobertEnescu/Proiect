import { Injectable } from '@angular/core';
import { Category } from '../category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseURL = 'http://localhost:7185/Category';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseURL}/all`);
  }

  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(
      `${this.baseURL}/byId?categoryId=${categoryId}`
    );
  }

  deleteCategoryById(categoryId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.baseURL}/delete?categoryId=${categoryId}`
    );
  }
}
