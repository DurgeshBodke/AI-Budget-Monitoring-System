import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private http = inject(HttpClient);

  private api = "https://ai-budget-monitoring-system.onrender.com/api/alerts";

  private headers() {
    return new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token")
    });
  }

  getAlerts() {
    return this.http.get(this.api, {
      headers: this.headers()
    });
  }

  deleteAlert(id: string) {
    return this.http.delete(`${this.api}/${id}`, {
      headers: this.headers()
    });
  }

}