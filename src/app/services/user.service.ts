import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  readonly API_URL: string = "http://localhost:3000/usuario";

  constructor(private httpClient: HttpClient) { }

  public delete(user_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}${user_id}`);
  }
}
