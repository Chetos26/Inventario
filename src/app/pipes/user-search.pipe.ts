import { Pipe, PipeTransform } from '@angular/core';
import { HardwareModel } from '../models/hardware-model.entity';

@Pipe({
  name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {

  transform(hardwareItems: HardwareModel[], targetUsers: string): HardwareModel[] {
    if (!hardwareItems || !targetUsers) {
      return hardwareItems;
    }
    console.log(targetUsers);
    return hardwareItems.filter(item =>
      item.users.nombre_u.toLowerCase().includes(targetUsers.toLowerCase())
    );
  }
}
