import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreateUsersDto, UpdateUsersDto, UsersModel } from 'src/app/models/users-model.entity,';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.css']
})
export class UsersRegisterComponent {
  usersForm: FormGroup;
  showRegisterModal = false;
  showUpdateModal = false;
  showErrorModal = false;
  errorMessage = '';

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.usersForm = this.formBuilder.group({
      foto: [''],
      nombre_u: ['', [Validators.required, Validators.pattern(this.naPattern)]],
      apellido_u: ['', [Validators.required, Validators.pattern(this.naPattern)]],
      telf: ['', [Validators.required, Validators.minLength(10), Validators.pattern(this.num),Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      cargo: ['', Validators.required],
    });
  }
  num:any = /^[0-9]+$/;
  naPattern: any = /^[a-zA-Z]/;
  emailPattern: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  usersModel: UsersModel[]=[];
  bool: boolean = false;
  showModal: boolean = false;

  ngOnInit(): void {
    this.bool = false;
    this.cargar();
    console.log(history.state)
    if (history.state.id_u) {
      this.cargar();
      this.bool = true;
    }
  }

  users: CreateUsersDto = {
    foto: '',
    nombre_u: '',
    apellido_u: '',
    telf: '',
    email: '',
    cargo: ''
  };

  usersUpdate: UpdateUsersDto = {
    foto: '',
    nombre_u: '',
    apellido_u: '',
    telf: '',
    email: '',
    cargo: '',
    id_u: ''
  };

  async registerUsers() {
    if (this.usersForm.valid) {
      const formData = this.usersForm.value;

      const email = formData.email;
      const telf = formData.telf;

      console.log('Form data:', formData);

      try {
          const response = this.usersService.store(formData).subscribe(() => {
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
      this.validateAllFormFields(this.usersForm);
    }
  }


  openRegisterModal() {
    this.showRegisterModal = false;
  }

  closeRegisterModal() {
    this.showRegisterModal = false;
  }

  update(users: UpdateUsersDto) {
    if (this.usersForm.valid) {
      const response = this.usersService.update(users.id_u, users).subscribe(() => {
        console.log(response);
        this.showUpdateModal = true; // Mostrar modal de actualización exitosa
      });
    } else {
      this.showModal = true; // Mostrar modal de validación
      this.validateAllFormFields(this.usersForm);
    }
  }

  closeModal() {
    this.showModal = false;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
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

  cargar(): void {
    this.activatedRoute.params.subscribe(
      e => {
        let id_u = e['id_u'];
        if (id_u) {
          this.usersService.getOne(id_u).subscribe(
            es => {
              this.usersUpdate.id_u = es.id_u;
              this.usersUpdate.cargo = es.cargo;
              this.usersUpdate.nombre_u = es.nombre_u;
              this.usersUpdate.apellido_u = es.apellido_u;
              this.usersUpdate.telf = es.telf;
              this.usersUpdate.email = es.email;

              console.log(this.usersUpdate)
            }
          )
        }
      }
    )
  }

  formErrors:any = {
    cargo: '',
    nombre_u: '',
    apellido_u: '',
    telf: '',
    email: '',
  };

  closeErrorModal() {
    this.showErrorModal = false;
    this.errorMessage = '';
  }

  clearForm() {
    this.usersForm.reset();
  }
}
