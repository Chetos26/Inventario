export interface UserModel {
  id_e: string;
  username: string;
  contrasenia: string;
}

export interface CreateUserModel extends  Omit<UserModel, 'id'>{
}

export interface UpdateUserModel extends Partial<UserModel>{
  id_e: string;
}
