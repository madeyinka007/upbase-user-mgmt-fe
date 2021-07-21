import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private url = '/auth/register'

  registerForm: FormGroup;
  _status:Boolean
  _msg:String

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.registerFormValidator();
  }

  get value () {
    return this.registerForm.controls
  }

  registerFormValidator() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return
    }
    this.httpService.post(this.url, this.registerForm.value).subscribe(
      (resp) => {
        if (resp.error == false) {
          this._status = true
          this._msg = resp.message
          this.registerForm.reset();
          this.router.navigate(['signin'])
        } else {
          this._status = false
          this._msg = resp.message
        }
      }
    )
  }

}
