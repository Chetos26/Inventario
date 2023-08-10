import { Pipe, PipeTransform } from '@angular/core';
import { HardwareModel } from '../models/hardware-model.entity';

@Pipe({
  name: 'categoriesSearch'
})
export class CategoriesSearchPipe implements PipeTransform {

  transform(hardwareItems: HardwareModel[], targetCategory: string): HardwareModel[] {
    if (!hardwareItems || !targetCategory) {
      return hardwareItems;
    }

    const search = hardwareItems.filter(item =>
      item.categories.nombre_c.toLowerCase().includes(targetCategory.toLowerCase())
      || item.users.nombre_u.toLowerCase().includes(targetCategory.toLowerCase()));

    return search
  }

}
