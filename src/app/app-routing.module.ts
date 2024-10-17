import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'addUsers', component: AddUsersComponent },
  { path: 'addUsers/:id', component: AddUsersComponent },
  { path: 'listUsers', component: ListUsersComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
