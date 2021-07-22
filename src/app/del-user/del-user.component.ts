import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-del-user',
  templateUrl: './del-user.component.html',
  styleUrls: ['./del-user.component.css']
})
export class DelUserComponent implements OnInit {

  private url = '/user/delete?identity='
  id:string;

  constructor(
    private _router: ActivatedRoute,
    private router: Router,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this._router.paramMap.subscribe(params => {
      const userId = params.get('id')
      if (userId) {
        console.log(userId)
        this.id = userId
      }
    })
  }

  delUser(Id:string){
    //console.log(Id)
    this.httpService.get(this.url+Id).subscribe(
      (data) => {
        if (data.error == false) {
          this.router.navigate(['signup'])
        }
      }
    )
  }

  retainUser() {
    this.router.navigateByUrl('/dashboard/users/profile/'+this.id)
  }

}
