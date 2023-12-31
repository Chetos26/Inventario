/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuarioModel } from 'src/app/models/auth-model.entity';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  usuario: LoginUsuarioModel = new LoginUsuarioModel('', '');

  email = '';

  password = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  camposVacios: boolean = false;


  onLogin(): void {
    if (this.email === '' || this.password === '') {
      this.camposVacios = true;
      return; // No continuar si los campos están vacíos
    }

    this.camposVacios = false; // Reiniciar la variable de campos vacíos

    this.usuario = new LoginUsuarioModel(this.email, this.password);
    this.authService.login(this.usuario).subscribe({
      next: (data: any) => {
        if (!data.token) {
          this.toastrService.error(data.response.message, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        } else {
          this.tokenService.setToken(data.token);
          this.router.navigate(['/']);
        }
      },
      error: (err: any) => {
        this.toastrService.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    });
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onLogin();
    }
  }

}
