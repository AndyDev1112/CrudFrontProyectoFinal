import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {



  userform: FormGroup
  titulo = "Crear usuario";
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private aRoute: ActivatedRoute) {
    this.userform = this.fb.group({
      id: ["", Validators.required, , Validators.maxLength(5)],
      nombre: ["", [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      apellido: ["", [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      password: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      email: ["", [Validators.required, Validators.email]],
    });

    this.id = this.aRoute.snapshot.paramMap.get("id");
    if (this.id !== null) {
      this.edit();


    }


  }
  ngOnInit(): void {
    if (this.id !== null) {
      this.titulo = "Editar usuario";
      this._userService.getuser("id").subscribe(data => {
        this.userform.setValue({
          id: data.id,
          nombre: data.nombre,
          apellido: data.apellido,
          password: data.password,
          email: data.email,
        });
      });
    }
  }

  adduser() {
    console.log(this.userform)
    console.log(this.userform.get('id')?.value)
    const USER: user = {
      id: this.userform.get('id')?.value,
      nombre: this.userform.get('nombre')?.value,
      apellido: this.userform.get('apellido')?.value,
      email: this.userform.get('email')?.value,
      password: this.userform.get('password')?.value,
    }

    if (this.id !== null) {
      this._userService.edituser(this.id, USER).subscribe(data => {
        this.toastr.info('El usuario fue actualizado exitosamente 👌', 'Usuario actualizado');
        this.router.navigate(["/listUsers"])
      }, error => {
        console.log(error);
        this.userform.reset();
      })
    } else {
      console.log(USER)
      this._userService.saveuser(USER).subscribe(data => {
        this.toastr.success('El usuario fue creado exitosamente 👌', 'Usuario creado');
        this.router.navigate(["/listUsers"])
      }, error => {
        console.log(error);
        this.userform.reset();
      })
    }
  }

  edit() {
    if (this.id !== null) {
      this.titulo = "Editar usuario";
      this._userService.getuser(this.id).subscribe(data => {
        // Asegurarse de que el campo 'id' en el formulario sea una cadena
        this.userform.setValue({
          id: data.id.toString(), // Convertir el número a string
          nombre: data.nombre,
          apellido: data.apellido,
          password: data.password,
          email: data.email,
        });
      });
    }
  }

}
