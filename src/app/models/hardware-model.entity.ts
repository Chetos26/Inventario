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
  sala:string;
  users: UsersModel;
  category: CategoryModel;
}

export interface CreateHardwareDto extends Omit<HardwareModel,'id_h'| 'category'| 'users'>{
  category:string;
  users: string
}

export interface UpdateHardwareDto extends Omit<HardwareModel, 'category' | 'users'> {
  category:string;
  users: string
}
