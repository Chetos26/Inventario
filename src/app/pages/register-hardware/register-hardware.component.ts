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
  showRegisterModal = false;
  showUpdateModal = false;
  showErrorModal = false;
  showModal: boolean = false;
  bool: boolean = false;
  clearForm() {
    this.hardwareForm.reset();
  }

  constructor(
    private hardwareService: HardwareService,
    private categoryService: CategoryService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,)
    {
      this.hardwareForm = this.formBuilder.group({
        categories: ['', Validators.required],
        users: ['', Validators.required],
        /* image: [''], */
        monitor_sn: ['', Validators.maxLength(20)],
        teclado: [''],
        mouse: [''],
        sn: ['', Validators.maxLength(20)],
        marca: ['', Validators.maxLength(15)],
        procesador: ['', Validators.maxLength(100)],
        ram: ['', Validators.maxLength(100)],
        almacenamiento: ['', Validators.maxLength(100)],
        sala: ['', Validators.maxLength(15)]
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

  gotcategories():void{
    for (let i = 0; i < this.category.length; i++) {
      if (this.hardware.categories == this.category[i].id_c || this.hardwareUpdate.categories == this.category[i].id_c) {
        this.name= this.category[i].nombre_c;
      }
    }
  }

  gotusers():void{
    for (let i = 0; i < this.users.length; i++) {
      if (this.hardware.users == this.users[i].id_u || this.hardwareUpdate.categories == this.users[i].id_u) {
        this.name= this.users[i].nombre_u;
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

  registerHardware() {
    if (this.hardwareForm.valid) {
      const formData = this.hardwareForm.value;

      console.log('Form data:', formData);

      try {
          const response = this.hardwareService.createHardware(formData).subscribe(() => {
            console.log('Registration successful:', response);
            this.showRegisterModal = false; // Cerrar modal de registro
            this.showRegisterModal = true; // Mostrar modal de registro exitoso
            this.clearForm();
          });
        }
      catch (error) {
        console.error(error);
      }

    } else {
      this.showModal = true; // Mostrar modal de validación
      console.log(this.showModal);
      this.validateAllFormFields(this.hardwareForm);
    }
  }

  openRegisterModal() {
    this.showRegisterModal = true;
    console.log(this.showRegisterModal)
  }

  closeRegisterModal() {
    this.showRegisterModal = false;
    console.log(this.showRegisterModal)
  }

  closeModal() {
    this.showModal = false;
    console.log(this.showModal)
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
    console.log(this.showUpdateModal)
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
          this.formErrors[field] = control.hasError('required') ? 'Campo requerido' : '';
        }
      }
    });
  }

  cargar():void{
    this.activatedRoute.params.subscribe(
      e=> {
        let id_h=e['id_h'];
        if(id_h){
          this.hardwareService.getOneHardware(id_h).subscribe(
            es=>{
              this.hardwareUpdate.id_h=es.id_h
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

  /* updateHardware(hardware: UpdateHardwareDto) {
    const response = this.hardwareService
      .updateHardware(hardware.id_h, hardware)
      .subscribe((response) => {
        console.log(response);
      });
  } */
  updateHardware(hardware: UpdateHardwareDto) {
    if (this.hardwareForm.valid) {
      const response = this.hardwareService.updateHardware(hardware.id_h, hardware).subscribe(() => {
        console.log(response);
        this.showUpdateModal = true; // Mostrar modal de actualización exitosa
      });
    } else {
      this.showModal = true; // Mostrar modal de validación
      this.validateAllFormFields(this.hardwareForm);
    }
  }

  hardware: CreateHardwareDto = {
    categories: '',
    sn: '',
    procesador: '',
    ram: '',
    users: '',
    /* image: '', */
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
    /* image: '', */
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

  formErrors:any = {
    categories: '',
    users: '',
    /* image: '', */
    monitor_sn: '',
    teclado: '',
    mouse: '',
    sn: '',
    marca: '',
    procesador: '',
    ram: '',
    almacenamiento: '',
    sala: ''
  };

  /* updateCounter(event: any) {
    const textLength = event.target.value.length;
    this.charCount = textLength <= 100 ? textLength : 100;

    // Update textarea value if it exceeds 100 characters
    if (textLength > 100) {
      event.target.value = event.target.value.slice(0, 100);
    }
  }
  charCount = 0; */
}
