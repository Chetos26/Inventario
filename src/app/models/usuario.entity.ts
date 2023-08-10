import { TipoUsuarioModel } from "./rol.entity";

export class UsuarioModel {
  user_id = 0;
  username = '';
  email = '';
  password = '';
  tipo_usuarioId: TipoUsuarioModel[] = [];
}
