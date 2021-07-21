import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/services/http.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  private url = '/user/by-identity?identity='
  private _url = '/user/modify'
  private _upload_url = '/assets/upload'
  user:any
  userForm:FormGroup
  image:any
  _status:Boolean
  _msg:String

  constructor(
    private httpService: HttpService,
    private _router: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
    ) { }

  ngOnInit() {
    this._router.paramMap.subscribe(params => {
      const userId = params.get('id')
      if (userId) {
        this.getUserInfo(userId)
      }
    })
    this.userFormValidator()
  }

  getUserInfo(userId: string) {
    this.httpService.get(this.url+userId).subscribe(
      (data) => {
        this.editUser(data.response)
        this.user = data.response
      }
    )
  }

  editUser(data:any){
    this.userForm.patchValue({
      firstname: data.fname,
      lastname: data.lname,
      username: data.username,
      occupation: data.occupation,
      age: data.age,
      avatar: data.avatar,
      facebook: data.facebook,
      twitter: data.twitter,
      profile: data.profile
    })
  }

  mapFormValues() {
    this.user.identity = localStorage.getItem('id'),
    this.user.firstname = this.userForm.value.firstname,
    this.user.lastname = this.userForm.value.lastname,
    this.user.username = this.userForm.value.username,
    this.user.occupation = this.userForm.value.occupation,
    this.user.age = this.userForm.value.age,
    this.user.facebook = this.userForm.value.facebook,
    this.user.twitter = this.userForm.value.twitter,
    this.user.avatar = this.userForm.value.avatar,
    this.user.profile = this.userForm.value.profile
  }


  userFormValidator() {
    this.userForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: [''],
      occupation: [''],
      profile: [''],
      facebook:[''],
      twitter:[''],
      age:[''],
      avatar:['']
    })
  }

  onSelectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.image = file
    }
  }

  changeAvatar(){
    const formData = new FormData();
    formData.append('file', this.image)
    this.httpService.file_post(this._upload_url, formData).subscribe(
      (data) => {
        if (data.error == false) {
          this.userForm.patchValue({avatar: data.response})
        }
      }
    )
  }


  onSubmit(){
    this.mapFormValues()
    this.httpService.post(this._url, this.user).subscribe(
      (data) => {
        if (data.error == false) {
          this._status = true
          this._msg = data.message
          //redirect to profile page...okay
        } else {
          this._status = false
          this._msg = data.message
        }
      }
    )
  }

}
