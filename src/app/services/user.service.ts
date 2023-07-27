import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  UserModel,
  CreateUserModel,
  UpdateUserModel
} from '../models/user-model.entity';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  readonly API_URL: string = "http://localhost:5000/user";

  constructor(private httpClient: HttpClient) { }

  /*getAll():Observable<UserModel[]> {
    const url = `${this.API_URL}`;
    return this.httpClient.get<UserModel[]>(url);
    //obejeto.metodo
  }
  getOne(id: UserModel['id']):Observable<UserModel> {//solo devuelve un objeto
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<UserModel>(url);
  }
  store(user: CreateUserModel):Observable<UserModel> {//no se usaran todos o campos(id, category)
    const url = `${this.API_URL}`;
    return this.httpClient.post<UserModel>(url, user)
  }

  update(id: UserModel['id'], user: UpdateUserModel):Observable<UserModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.put<UserModel>(url, user);//devuelve un observable de tipo UserModel
  }
  destroy(id: UserModel['id']):Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<any>(url).pipe(map((response: { rta: boolean; }) => {
    //objeto.atributo.metodo(delete)
      return response.rta;
      })
      );
  }*/
}
