import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private http = inject(HttpClient);

  private api = "https://ai-budget-monitoring-system.onrender.com/api/budgets";

  private getHeaders() {

    return new HttpHeaders({

      Authorization: "Bearer " + localStorage.getItem("token")

    });

  }

  getBudgets() {

    return this.http.get(this.api, {

      headers: this.getHeaders()

    });

  }

  createBudget(data:any) {

    return this.http.post(

      this.api,

      data,

      {

        headers:this.getHeaders()

      }

    );

  }

  updateBudget(id:string,data:any){

    return this.http.put(

      `${this.api}/${id}`,

      data,

      {

        headers:this.getHeaders()

      }

    );

  }

  deleteBudget(id:string){

    return this.http.delete(

      `${this.api}/${id}`,

      {

        headers:this.getHeaders()

      }

    );

  }

}