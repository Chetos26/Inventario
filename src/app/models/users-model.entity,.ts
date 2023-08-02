export interface UsersModel {
  id_u: string;
  foto: string;
  cargo: string;
  nombre_u: string;
  apellido_u: string;
  telf: string;
  email: string;
}

export interface CreateUsersDto extends  Omit<UsersModel, 'id_u'>{
}

export interface UpdateUsersDto extends Partial<UsersModel>{
  id_u: string;
}
