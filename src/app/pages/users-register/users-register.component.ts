import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CreateUsersModel } from 'src/app/models/users-model.entity,';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.css']
})
export class UsersRegisterComponent {

  constructor(private usersServices: UsersService) { }

  ngOnInit(): void {

  }

  users: CreateUsersModel={
    foto: '',
    nombre_u: '',
    apellido_u: '',
    telf: '',
    email: '',
    cargo: ''
  }

  registerUsers() {
    console.log(this.users)
    const response = this.usersServices
      .store(this.users)
      .subscribe((response) => {
        console.log(response);
      });
  }

  //boton eliminar 
  

}
