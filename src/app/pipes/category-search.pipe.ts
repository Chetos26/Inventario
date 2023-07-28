import { Pipe, PipeTransform } from '@angular/core';
import { HardwareModel } from '../models/hardware-model.entity';

@Pipe({
  name: 'categoriesSearch'
})
export class CategoriesSearchPipe implements PipeTransform {

  transform(hardwareList: HardwareModel[], selectedCategories: string, searchTerm: string): HardwareModel[] {
    if (!hardwareList) {
      return [];
    }

    if (!selectedCategories && !searchTerm) {
      return hardwareList;
    }

    return hardwareList.filter(hardware => {
      const categoriesMatch = !selectedCategories || hardware.categories.nombre_c.toLowerCase().includes(selectedCategories.toLowerCase());
      const searchTermMatch = !searchTerm || hardware.users.nombre_u.toLowerCase().includes(searchTerm.toLowerCase());

      return categoriesMatch && searchTermMatch;
    });
  }

}
