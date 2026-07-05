import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  private api = "http://localhost:5000/api/users";

  private headers() {
    return new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token")
    });
  }

  getUsers() {
    return this.http.get(this.api, {
      headers: this.headers()
    });
  }

  createUser(data:any) {
    return this.http.post(this.api,data,{
      headers:this.headers()
    });
  }

  deleteUser(id:string){
    return this.http.delete(`${this.api}/${id}`,{
      headers:this.headers()
    });
  }

}