import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private url = '/user/by-identity?identity='
  private _url = '/user/delete?identity='
  user:any
  _status:Boolean
  _msg:String

  constructor(
    private _router: ActivatedRoute,
    private router: Router,
    private httpService: HttpService
    ) { }

  ngOnInit() {
    this._router.paramMap.subscribe(params => {
      const userId = params.get('id')
      if(userId) {
        this.getUserInfo(userId)
      }
    })
  }

  getUserInfo(id:string) {
    this.httpService.get(this.url+id).subscribe(
      (data) => {
        if (data.error == false) {
          this.user = data.response
        }
      }
    )
  }

  delUser(id:string){
   this.router.navigate(['/dashboard/users/del-user', id])
  }

}
