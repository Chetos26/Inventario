import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  isLogged = true;
  isAdmin = true;
  correo_usuario = '';

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged() ? true : this.isLogged = false;
    this.isAdmin = this.tokenService.isAdmin() ?? false;
    this.correo_usuario = this.tokenService.getInfoUser() ?? ''
  }

  logOut(): void {
    this.tokenService.logOut();
  }
}
