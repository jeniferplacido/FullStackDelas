import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'https://fullstackdelas-back.onrender.com/linkedin';

  constructor(private http: HttpClient) {}

  getCurriculos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  adicionarCurriculo(curriculo: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, curriculo);
  }

  atualizarCurriculo(id: string, curriculo: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<any>(url, curriculo);
  }

  obterCurriculoPorId(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<any>(url);
  }

  deletarCurriculo(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
