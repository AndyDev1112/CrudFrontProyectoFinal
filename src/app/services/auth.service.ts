import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = "http://localhost:3000/api";
  private registrosUrl = `${this.baseUrl}/registros`;

  constructor(private http: HttpClient) { }

  signUp(email: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, email);
  }

  getRegistros() {
    return this.http.get<any>(this.registrosUrl);
  }

  deleteRegistro(id: string) {
    const url = `${this.registrosUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  saveRegistro(data: any) {
    return this.http.post<any>(this.registrosUrl, data);
  }

  updateRegistro(id: string, data: any) {
    const url = `${this.registrosUrl}/${id}`;
    return this.http.put<any>(url, data);
  }
}
