import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users.route'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule
  ]
})

export class UsersModule { }
