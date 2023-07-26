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
    nombre: '',
    apellido: '',
    telf: '',
    email: '',
    cargo: ''
  }

  registerUsers(users: CreateUsersModel) {
    console.log(users)
    const response = this.usersServices
      .store(users)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
