import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  UsersModel,
  CreateUsersDto,
  UpdateUsersDto
} from '../models/users-model.entity,';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  readonly API_URL: string = "http://localhost:3000/users";

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<UsersModel[]> {
    const url = `${this.API_URL}`;
    return this.httpClient.get<UsersModel[]>(url);
    //obejeto.metodo
  }
  getOne(id_u: string): Observable<UsersModel> {
    const url = `${this.API_URL}/${id_u}`;
    return this.httpClient.get<UsersModel>(url);
  }
  store(user: CreateUsersDto):Observable<UsersModel> {//no se usaran todos o campos(id, category)
    const url = `${this.API_URL}`;
    return this.httpClient.post<UsersModel>(url, user)
  }

  update(id_u: UsersModel['id_u'], user: UpdateUsersDto):Observable<UsersModel> {
    const url = `${this.API_URL}/${id_u}`;
    return this.httpClient.patch<UsersModel>(url, user);//devuelve un observable de tipo UserModel
  }
  destroy(id_u: UsersModel['id_u']):Observable<any> {
    const url = `${this.API_URL}/${id_u}`;
    return this.httpClient.delete<any>(url).pipe(map((response: { rta: boolean; }) => {
    //objeto.atributo.metodo(delete)
      return response.rta;
      })
      );
  }
}
