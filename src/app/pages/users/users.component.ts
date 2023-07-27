import { Component, OnInit } from '@angular/core';
import { UpdateUsersModel, UsersModel } from 'src/app/models/users-model.entity,';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  router: any;

  constructor(private usersService: UsersService) {}


  ngOnInit(): void {
    this.usersService.getAll().subscribe(data=>{
      this.users= data;
    })
  }

  editar(id_u:UsersModel['id_u']){
    this.router.navigate(['pages/users-register', id_u])

  }

  users: UsersModel[]=[];

  delete_users(id_u:UsersModel['id_u']){
    this.usersService.destroy(id_u).subscribe(
      response=>{
        this.users=this.users.filter(
          users=>users.id_u!= id_u)
      })
  }


  usersModel: UpdateUsersModel = {
    foto: '',
    cargo: '',
    nombre_u: '',
    apellido_u: '',
    telf: '',
    email: '',
    id_u: ''
  }

  updateUsers(users: UpdateUsersModel) {
    console.log(users)
    console.log('update')
    const response = this.usersService.update(users.id_u, users)
      .subscribe((response) => {
        console.log(response);
      });
  }

}
