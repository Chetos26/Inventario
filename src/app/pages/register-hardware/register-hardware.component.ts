import { Component } from '@angular/core';
import { CategoryModel } from 'src/app/models/category-model.entity';
import { CreateHardwareDto, HardwareModel } from 'src/app/models/hardware-model.entity';
import { CategoryService } from 'src/app/services/category.service';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-register-hardware',
  templateUrl: './register-hardware.component.html',
  styleUrls: ['./register-hardware.component.css']
})
export class RegisterHardwareComponent {
  constructor(private hardwareService: HardwareService, private categoryService: CategoryService) { }

  hardwareModel: HardwareModel[] = [];
  category: CategoryModel[] = [];

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.category = data;
    })
  }

  /*hardware: CreateHardwareDto = {
    categoria: '',
    usuario: ,
    sn: '',
    marca: '',
    os: '',
    procesador: '',
    ram: ''
  }*/

  registerHardware(hardware: CreateHardwareDto) {
    console.log(hardware)
    const response = this.hardwareService
      .createHardware(hardware)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
