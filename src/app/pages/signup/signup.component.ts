import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  }

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log(this.user)

    if (this.user.username == null || this.user.username=='') {
      this.snack.open("El username es requerido.","Aceptar",{
        duration:3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'

      });
      return;
    }

    this.userService.addUser(this.user).subscribe({
      next:(data) => {
        console.log(data);
        Swal.fire('Usuario Guardado', 'Usuario registrado con éxito!','success');
      },
      error: (error) => {
        console.log(error);
        this.snack.open("Ha ocurrido un error.","Aceptar",{
          duration:3000
        });
      }
    }
    )
  }
  
}
