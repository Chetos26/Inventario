import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UpdateUsersDto, UsersModel } from 'src/app/models/users-model.entity,';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  router: any;
  users: UsersModel[]=[];

  constructor(private usersService: UsersService) {}


  ngOnInit(): void {
    this.usersService.getAll().subscribe(data=>{
      this.users= data;
    })
  }

  getUsers(){
    this.usersService.getAll().subscribe(
      response=>{
        this.users= response}
      )
  }

  getUser(id_u:string){
    this.usersService.getOne(id_u).subscribe
    (response=>{console.log(response)})
  }

  editar(id_u:UsersModel['id_u']){
    this.router.navigate(['pages/users-register', id_u])

  }

  deleteUsers(id_u:UsersModel['id_u']){
    this.usersService.destroy(id_u).subscribe(
      response => {
        this.users= this.users.filter(users => users.id_u != id_u);
        console.log(response)})
  }

   targetUsers: string='';
     applyUsersFilter(users: string): void {
      this.targetUsers = users;
    }

  @ViewChild('confirmDeleteModal') confirmDeleteModal!: ElementRef; // Acceso al modal

  usersToDeleteId: string | null = null;

  showDeleteConfirmationModal(id: string): void {
    this.usersToDeleteId = id;
    this.confirmDeleteModal.nativeElement.classList.add('show'); // Mostrar el modal
  }

  confirmDelete(): void {
    if (this.usersToDeleteId) {
      this.deleteUsers(this.usersToDeleteId);
    }
    this.usersToDeleteId = null;
    this.confirmDeleteModal.nativeElement.classList.remove('show'); // Ocultar el modal
  }

}
