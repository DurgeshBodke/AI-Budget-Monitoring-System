import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private http = inject(HttpClient);

  private api = 'https://ai-budget-monitoring-system.onrender.com/api/expenses';

  private getHeaders() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
  }

  getExpenses() {
    return this.http.get(this.api, {
      headers: this.getHeaders()
    });
  }

  createExpense(data: any) {
    return this.http.post(this.api, data, {
      headers: this.getHeaders()
    });
  }

  deleteExpense(id: string) {
    return this.http.delete(`${this.api}/${id}`, {
      headers: this.getHeaders()
    });
  }
}