import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  constructor(private snack: MatSnackBar, private loginService: LoginService) {}

  ngOnInit(): void {}

  formSubmit() {
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username.trim() == null
    ) {
      this.snack.open('El username es requerido', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password.trim() == null
    ) {
      this.snack.open('La contraseña es requerida', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe({
          next: (user:any) => {
            this.loginService.setUser(user);
            console.log(user);
            if (this.loginService.getUserRole() == "ADMIN") {
              window.location.href = '/admin';
            }
            else if (this.loginService.getUserRole() == "NORMAL") {
              window.location.href = '/user-dashboard';
            }
            else {
              this.loginService.logout();
            }
          }
        })
      },
      error: (error) => {
        console.log(error);
        this.snack.open('Datos Inválidos.', 'Aceptar', {
          duration: 3000,
        });
      },
    });
  }
}
