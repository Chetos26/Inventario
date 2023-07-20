export interface UsersModel {
  id_u: string;
  foto: string;
  nombre: string;
  apellido: string;
  telf: string;
  email: string;
}

export interface CreateUsersModel extends  Omit<UsersModel, 'id_u'>{
}

export interface UpdateUsersModel extends Partial<UsersModel>{
  id_u: string;
}
