import { Pipe, PipeTransform } from '@angular/core';
import { HardwareModel } from '../models/hardware-model.entity';

@Pipe({
  name: 'categoriesSearch'
})
export class CategoriesSearchPipe implements PipeTransform {

  transform(hardware: any[], categories: string):any[]{
    if (!hardware || !categories) {
      return hardware;
    }
    return hardware.filter(hardware =>
      hardware.categories.nombre_c === categories)
  }

}
