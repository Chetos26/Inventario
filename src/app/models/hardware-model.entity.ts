import { CategoryModel } from "./category-model.entity";
import { UsersModel } from "./users-model.entity,";

export interface HardwareModel {
  id_h: string;
  image: string;
  monitor_sn: string;
  teclado: boolean;
  mouse: boolean;
  sn: string;
  marca:  string;
  procesador:  string;
  ram: string;
  almacenamiento: string;
  sala:string;
  users: UsersModel;
  categories: CategoryModel;
}

export interface CreateHardwareDto extends Omit<HardwareModel,'id_h'| 'categories'| 'users'>{
  categories:string;
  users: string
}

export interface UpdateHardwareDto extends Omit<HardwareModel, 'categories' | 'users'> {
  categories:string;
  users: string
}
