export class user {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;


  constructor(id: string, nombre: string, apellido: string, email: string, password: string,){
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.password = password;
    this.email = email;
  }
}
