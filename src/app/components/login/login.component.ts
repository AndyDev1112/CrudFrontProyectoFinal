import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from "../../services/auth.service"
import { Route, Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: FormGroup;
  user = {
    email: "",
    password: ""
  }

  constructor(private AuthService: AuthService,
    private router: Router) {
    this.login = new FormGroup({
      email: new FormControl("0", [Validators.required]),
      password: new FormControl("0", [Validators.required])
    })
  }


  ngOnInit() {
  }

  signUp() {
    this.AuthService.signUp(this.user).subscribe(
      res => {
       // console.log(res)
        localStorage.setItem("token", res.token);
        this.router.navigate(["/listUsers"])
      }, err => console.log(err)
    )
  }

}
