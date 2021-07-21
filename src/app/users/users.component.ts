import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  isAdmin:Boolean

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('role') == 'admin') {
      this.isAdmin = true
    } else {
      this.isAdmin = false
    }
  }

}
