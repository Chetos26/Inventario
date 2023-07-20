import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  UsersModel,
  CreateUsersModel,
  UpdateUsersModel
} from '../models/users-model.entity,';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  readonly API_URL: string = "http://localhost:5000/user";

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<UsersModel[]> {
    const url = `${this.API_URL}`;
    return this.httpClient.get<UsersModel[]>(url);
    //obejeto.metodo
  }
  getOne(id: UsersModel['id']):Observable<UsersModel> {//solo devuelve un objeto
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<UsersModel>(url);
  }
  store(user: CreateUsersModel):Observable<UsersModel> {//no se usaran todos o campos(id, category)
    const url = `${this.API_URL}`;
    return this.httpClient.post<UsersModel>(url, user)
  }

  update(id: UsersModel['id'], user: UpdateUsersModel):Observable<UsersModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.put<UsersModel>(url, user);//devuelve un observable de tipo UserModel
  }
  destroy(id: UsersModel['id']):Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<any>(url).pipe(map((response: { rta: boolean; }) => {
    //objeto.atributo.metodo(delete)
      return response.rta;
      })
      );
  }
}
