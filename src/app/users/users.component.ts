import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private url = '/user/pull'
  isAdmin:Boolean
  users:any

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('role') == 'admin') {
      this.isAdmin = true
      this.getUsers()
    } else {
      this.isAdmin = false
    }
  }

  getUsers(){
    this.httpService.get(this.url).subscribe(
      (data) => {
        if (data.error == false) {
          this.users = data.response
        }
      }
    )
  }

}
