import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private http = inject(HttpClient);

  private api = "https://ai-budget-monitoring-system.onrender.com/api/departments";

  private getHeaders() {
    return new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token")
    });
  }

  getDepartments() {
    return this.http.get(this.api, {
      headers: this.getHeaders()
    });
  }

  createDepartment(data: any) {
    return this.http.post(this.api, data, {
      headers: this.getHeaders()
    });
  }

  updateDepartment(id: string, data: any) {
    return this.http.put(`${this.api}/${id}`, data, {
      headers: this.getHeaders()
    });
  }

  deleteDepartment(id: string) {
    return this.http.delete(`${this.api}/${id}`, {
      headers: this.getHeaders()
    });
  }

}