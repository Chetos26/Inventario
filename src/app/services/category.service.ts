import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  CategoryModel,
  CreateCategoryModel,
  UpdateCategoryModel
} from '../models/category-model.entity';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  readonly API_URL: string = "";

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<CategoryModel[]> {
    const url = `${this.API_URL}`;
    return this.httpClient.get<CategoryModel[]>(url);
    //obejeto.metodo
  }
  getOne(id: CategoryModel['id_c']):Observable<CategoryModel> {//solo devuelve un objeto
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<CategoryModel>(url);
  }
  store(category: CreateCategoryModel):Observable<CategoryModel> {//no se usaran todos o campos(id, category)
    const url = `${this.API_URL}`;
    return this.httpClient.post<CategoryModel>(url, category)
  }

  update(id: CategoryModel['id_c'], category: UpdateCategoryModel):Observable<CategoryModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.put<CategoryModel>(url, category);//devuelve un observable de tipo CategoryModel
  }
  destroy(id: CategoryModel['id_c']):Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<any>(url).pipe(map((response: { rta: boolean; }) => {
    //objeto.atributo.metodo(delete)
      return response.rta;
      })
      );
  }
}
