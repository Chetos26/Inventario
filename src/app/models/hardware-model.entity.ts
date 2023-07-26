import { CategoryModel } from "./category-model.entity";
import { UsersModel } from "./users-model.entity,";

export interface HardwareModel {
  id_h: string;
  foto: string;
  monitor_sn: string;
  teclado: boolean;
  mouse: boolean;
  sn: string;
  marca:  string;
  procesador:  string;
  ram: string;
  sala:string;
  usuario: UsersModel;
  categoria: CategoryModel;
}

export interface CreateHardwareDto extends Omit<HardwareModel,'id_h'>{

}

export interface UpdateHardwareDto extends Omit<HardwareModel, 'categoria'| 'usuario'> {
  categoria:string;
  usuario: string
}
