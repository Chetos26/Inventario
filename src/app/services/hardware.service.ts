import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateHardwareDto, HardwareModel, UpdateHardwareDto } from '../models/hardware-model.entity';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HardwareService {
  readonly API_URL = '';
  constructor(private httpClient: HttpClient) { }

  getAllHardware(): Observable<HardwareModel[]> {
    const url = `${this.API_URL}`;
    return this.httpClient.get<HardwareModel[]>(url);
  }

  getOneHardware(id: HardwareModel['id_h']): Observable<HardwareModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<HardwareModel>(url);
  }

  createHardware({categoria, ...hardwareData}:CreateHardwareDto): Observable<HardwareModel> {
    const hardware = {
      ...hardwareData,
      categoria:{
        nombre_c: categoria
      }
    }
    const url = `${this.API_URL}`;
    return this.httpClient.post<HardwareModel>(url, hardware);
  }

  updateHardware(id: HardwareModel['id_h'],product: UpdateHardwareDto): Observable<HardwareModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.put<HardwareModel>(url, product);
  }

  destroyHardware(id: HardwareModel['id_h']):Observable<boolean>  {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<any>(url).pipe(map((response: { rta: boolean }) => { return response.rta })
    );
  }
}
