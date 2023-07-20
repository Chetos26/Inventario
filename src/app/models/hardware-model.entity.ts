import { CategoryModel } from "./category-model.entity";
import { UsersModel } from "./users-model.entity,";

export interface HardwareModel {
  id_h: string;
  sn: string;
  marca:  string;
  os: string;
  procesador:  string;
  ram: string;
  qr: string;
  usuario: UsersModel;
  categoria: CategoryModel;
}

export interface CreateHardwareDto extends Omit<HardwareModel,'id_h'>{

}

export interface UpdateHardwareDto extends Omit<HardwareModel, 'categoria'| 'usuario'> {
  categoria:string;
  usuario: string
}
