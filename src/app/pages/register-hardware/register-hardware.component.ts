import { Component } from '@angular/core';
import { CategoryModel } from 'src/app/models/category-model.entity';
import { CreateHardwareDto, HardwareModel } from 'src/app/models/hardware-model.entity';
import { UsersModel } from 'src/app/models/users-model.entity,';
import { CategoryService } from 'src/app/services/category.service';
import { HardwareService } from 'src/app/services/hardware.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-hardware',
  templateUrl: './register-hardware.component.html',
  styleUrls: ['./register-hardware.component.css']
})
export class RegisterHardwareComponent {
  constructor(private hardwareService: HardwareService, private categoryService: CategoryService, private usersService: UsersService) { }

  hardwareModel: HardwareModel[] = [];
  category: CategoryModel[] = [];
  users: UsersModel[] = [];

  ngOnInit(): void {

    this.getCategories()
    this.getUsers()

  }

  getCategories():void{
    this.categoryService.getAll().subscribe(data => {
      this.category = data;
      console.log(data)
    })
  }

  getUsers():void {
    this.usersService.getAll().subscribe(data => {
      this.users = data;
    })
  }

  hardware: CreateHardwareDto = {
    category: '',
    sn: '',
    procesador: '',
    ram: '',
    users: '',
    image: '',
    monitor_sn: '',
    teclado: false,
    mouse: false,
    marca: '',
    sala: ''
  }

  registerHardware() {
    console.log(this.hardware)
    const response = this.hardwareService
      .createHardware(this.hardware)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
