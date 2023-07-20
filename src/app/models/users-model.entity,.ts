export interface UsersModel {
  id: string;
  foto: string;
  nombre: string;
  apellido: string;
  telf: string;
  email: string;
}

export interface CreateUsersModel extends  Omit<UsersModel, 'id'>{
}

export interface UpdateUsersModel extends Partial<UsersModel>{
  id: string;
}
