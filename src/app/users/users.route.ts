import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelUserComponent } from '../del-user/del-user.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UsersComponent } from './users.component'

const users_routes: Routes = [
  {
    path: '', redirectTo: 'users', pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'profile/:id',
    component: UserProfileComponent
  },
  {
    path: 'edit-profile/:id',
    component: EditProfileComponent
  },
  {
    path: 'del-user/:id',
    component: DelUserComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(users_routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
