import { CategoryModel } from "./category-model.entity";
import { UsersModel } from "./users-model.entity,";

export interface HardwareModel {
  id_h: string;
  /* image: string; */
  monitor_sn: string;
  teclado: string;
  mouse: string;
  sn: string;
  marca:  string;
  procesador:  string;
  ram: string;
  almacenamiento: string;
  sala:string;
  users: UsersModel;
  categories: CategoryModel;
  qrCodeDataUrl?: string;
  name?:string
}

export interface CreateHardwareDto extends Omit<HardwareModel,'id_h'| 'categories'| 'users'>{
  categories:string;
  users: string
}

export interface UpdateHardwareDto extends Omit<HardwareModel, 'categories' | 'users'> {
  categories:string;
  users: string
}
