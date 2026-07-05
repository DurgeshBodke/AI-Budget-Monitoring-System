import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private http = inject(HttpClient);

  private api = "http://localhost:5000/api/reports";

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