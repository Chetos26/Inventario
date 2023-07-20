import { CategoryModel } from "./category-model.entity";
import { UsersModel } from "./users-model.entity,";

export interface HardwareModel {
  id: string;
  sn: string;
  marca:  string;
  os: string;
  procesador:  string;
  ram: string;
  ususario: UsersModel;
  categoria: CategoryModel;
}
