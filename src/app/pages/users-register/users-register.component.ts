import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreateUsersDto, UpdateUsersDto } from 'src/app/models/users-model.entity,';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-register',
  templateUrl: './users-register.component.html',
  styleUrls: ['./users-register.component.css']
})
export class UsersRegisterComponent {

  constructor(private usersService: UsersService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

  }

  users: CreateUsersDto={
    foto: '',
    nombre_u: '',
    apellido_u: '',
    telf: '',
    email: '',
    cargo: ''
  }

  usersUpdate: UpdateUsersDto={
    foto: '',
    nombre_u: '',
    apellido_u: '',
    telf: '',
    email: '',
    cargo: '',
    id_u: ''
  }

  registerUsers() {
    console.log(this.users)
    const response = this.usersService
      .store(this.users)
      .subscribe((response) => {
        console.log(response);
      });

  }
  
  cargar():void{
    this.activatedRoute.params.subscribe(
      e=> {
        let id_u=e['id_u'];
        if(id_u){
          this.usersService.getOne(id_u).subscribe(
            es=>{
              this.usersUpdate.id_u=es.id_u
              this.usersUpdate.cargo=es.cargo
              this.usersUpdate.nombre_u=es.nombre_u
              this.usersUpdate.apellido_u=es.apellido_u
              this.usersUpdate.telf=es.telf
              this.usersUpdate.email=es.email
            }
          )
        }
      }
    )
  }
  
  update(users:UpdateUsersDto){
    const response = this.usersService.update(users.id_u, users).subscribe((response)=> {
      console.log(response);
    });
  }
}
