import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private url = '/user/by-identity?identity='+localStorage.getItem('id')

  user:any = {}

  constructor(private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.get(this.url).subscribe((data) => {
      if (data)
        this.user = data.response
    })
  }

  userProfile(id:string) {
    this.router.navigate(['dashboard/users/profile', id])
  }

  editUser(id:string){
    this.router.navigate(['dashboard/users/edit-profile', id])
  }

  logout() {
    localStorage.removeItem('token');
    // localStorage.removeItem('id')
    // localStorage.removeItem('username')
    // localStorage.removeItem('role')
    this.router.navigate(['/signin'])
  }

}
