import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private url = '/auth/login'
  private url2 = '/auth/usercontext'

  loginForm: FormGroup
  _status: Boolean
  _msg: String

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.loginFormValidator();
  }

  get value () {
    return this.loginForm.controls
  }

  loginFormValidator() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return
    }
    this.httpService.post(this.url, this.loginForm.value).subscribe(
       (resp) => {
        if (resp.error == false) {
          this._status = true,
          this._msg = resp.message
          localStorage.setItem('token', resp.response)
          this.httpService.get(this.url2).subscribe(
            (data) => {
              if (data.response !== null) {
                localStorage.setItem('id', data.response.id)
                localStorage.setItem('username', data.response.username)
                localStorage.setItem('role', data.response.role)
                this.router.navigate(['/dashboard/users'])
              }
            }
          )

        }else {
          this._status = false
          this._msg = resp.message
        }
      }
    )
  }

}
