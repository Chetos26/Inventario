import { Pipe, PipeTransform } from '@angular/core';
import { UsersModel } from '../models/users-model.entity,';

@Pipe({
  name: 'usersComponent'
})
export class UsersComponentPipe implements PipeTransform {

  transform(usersItems: UsersModel[], targetUsers: string): UsersModel[] {
    if (!usersItems || !targetUsers) {
      return usersItems;
    }

    return usersItems.filter(item =>
      item.nombre_u.toLowerCase().includes(targetUsers.toLowerCase())
    );
  }

}
