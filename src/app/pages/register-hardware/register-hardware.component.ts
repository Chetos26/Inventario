import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from 'src/app/models/category-model.entity';
import { CreateHardwareDto, HardwareModel, UpdateHardwareDto } from 'src/app/models/hardware-model.entity';
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

  hardwareForm: FormGroup;
  constructor(
    private hardwareService: HardwareService,
    private categoryService: CategoryService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder)
    {

      this.hardwareForm = this.formBuilder.group({
        categories: ['', Validators.required], // Campo de categoría requerido
        users: ['', Validators.required],      // Campo de usuario requerido
        sn: [''],
        procesador: [''],
        ram: [''],
        image: [''],
        monitor_sn: [''],
        teclado: [''],
        mouse: [''],
        marca: [''],
        sala: [''],
        almacenamiento: ['']
      });
    }

  hardwareModel: HardwareModel[] = [];
  category: CategoryModel[] = [];
  users: UsersModel[] = [];

  ngOnInit(): void {

    this.getCategories()
    this.bool=false
    this.getUsers()
    console.log(history.state)
    if (history.state.id_h) {
      this.cargar()
      this.bool=true
    }
  }

  bool: boolean = false;

  gotcategories():void{
    for (let i = 0; i < this.category.length; i++) {
      if (this.hardware.categories == this.category[i].id_c || this.hardwareUpdate.categories == this.category[i].id_c) {
        this.name= this.category[i].nombre_c;
      }
    }
  }

  name: string = '';

  getCategories():void{
    this.categoryService.getAll().subscribe(data => {
      this.category = data;
    })
  }

  getUsers():void {
    this.usersService.getAll().subscribe(data => {
      this.users = data;
    })
  }

  hardware: CreateHardwareDto = {
    categories: '',
    sn: '',
    procesador: '',
    ram: '',
    users: '',
    image: '',
    monitor_sn: '',
    teclado: '',
    mouse: '',
    marca: '',
    sala: '',
    almacenamiento: ''
  }

  hardwareUpdate: UpdateHardwareDto = {
    categories: '',
    users: '',
    id_h: '',
    image: '',
    monitor_sn: '',
    teclado: '',
    mouse: '',
    sn: '',
    marca: '',
    procesador: '',
    ram: '',
    almacenamiento: '',
    sala: ''
  }

  /*registerHardware() {
    console.log(this.hardware)
    const response = this.hardwareService
      .createHardware(this.hardware)
      .subscribe((response) => {
        console.log(response);
      });
  }*/

  cargar():void{
    this.activatedRoute.params.subscribe(
      e=> {
        let id_h=e['id_h'];
        if(id_h){
          this.hardwareService.getOneHardware(id_h).subscribe(
            es=>{this.hardwareUpdate.id_h=es.id_h
              this.hardwareUpdate.monitor_sn=es.monitor_sn
              this.hardwareUpdate.teclado=es.teclado
              this.hardwareUpdate.mouse=es.mouse
              this.hardwareUpdate.sn=es.sn
              this.hardwareUpdate.marca=es.marca
              this.hardwareUpdate.procesador=es.procesador
              this.hardwareUpdate.ram=es.ram
              this.hardwareUpdate.almacenamiento=es.almacenamiento
              this.hardwareUpdate.sala=es.sala
              this.hardwareUpdate.categories=es.categories.id_c
              this.hardwareUpdate.users=es.users.id_u

              console.log(this.hardwareUpdate)
            }
          )
        }
      }
    )
  }

  /*updateHardware(hardware: UpdateHardwareDto) {
    const response = this.hardwareService
      .updateHardware(hardware.id_h, hardware)
      .subscribe((response) => {
        console.log(response);
      });
  }*/


  registerHardware() {
    if (this.hardwareForm.valid) {
      const hardwareData = this.hardwareForm.value;
      const response = this.hardwareService.createHardware(hardwareData).subscribe((response) => {
        console.log(response);
      });
    } else {
      this.validateAllFormFields(this.hardwareForm);
    }
  }

  updateHardware(hardware: UpdateHardwareDto) {
    if (this.hardwareForm.valid) {
      const response = this.hardwareService.updateHardware(hardware.id_h, hardware).subscribe((response) => {
        console.log(response);
      });
    } else {
      this.validateAllFormFields(this.hardwareForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        if (control) {
          control.markAsTouched({ onlySelf: true });
          control.markAsDirty({ onlySelf: true });
        }
      }
    });
  }


}
