import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  public token: string = localStorage.getItem("token") || "";
  private apiUrl = "http://localhost:3000/api/registros";

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8', 
      Authorization: `Bearer ${this.token}` 
    })
  };
  
  getusers(): Observable<any>{
    return this.http.get(`${this.apiUrl}`, this.httpOptions);
  }

  deleteuser(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  saveuser(user: user): Observable<any>{
    return this.http.post(`${this.apiUrl}`, user, this.httpOptions);
  }

  getuser(id: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  edituser(id: string, user: user): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, user, this.httpOptions);
  }
}
