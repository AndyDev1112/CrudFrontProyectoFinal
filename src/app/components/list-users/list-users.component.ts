import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  listusers: user [] = [];

  constructor(private _userservice: UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getusers();
  }

  getusers() {
    this._userservice.getusers().subscribe(data => {
      console.log(data); // Verifica que el array tiene los objetos con las propiedades correctas
      this.listusers = data;
    }, error => {
      console.log(error);
    });
  }

  deleteuser(id: any) {
    this._userservice.deleteuser(id).subscribe(data => {
      this.toastr.error("El usuario fue eliminado con exito", "Usuario eliminado");
      this.getusers();
    }, error => {
      console.log(error);
    })
  }
}
