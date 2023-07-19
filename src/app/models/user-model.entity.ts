export interface UserModel {
  id: string;
  username: string;
  contrasenia: string;
}

export interface CreateUserModel extends  Omit<UserModel, 'id'>{
}

export interface UpdateUserModel extends Partial<UserModel>{
  id: string;
}
