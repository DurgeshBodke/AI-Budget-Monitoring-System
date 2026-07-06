import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private http = inject(HttpClient);

  private api = "https://ai-budget-monitoring-system.onrender.com/api/reports";

  private getHeaders() {

    return new HttpHeaders({

      Authorization: "Bearer " + localStorage.getItem("token")

    });

  }

  getReports() {

    return this.http.get(this.api, {

      headers: this.getHeaders()

    });

  }

}