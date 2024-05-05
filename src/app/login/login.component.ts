import {Component,OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public loginFormGroup! : FormGroup
  constructor(private fb : FormBuilder,private authenticationService : AuthenticationService) {
  }
  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
        username:this.fb.control(''),
        password:this.fb.control('')
    }
    )
  }

  login() {
    let username = this.loginFormGroup.value.username;
    let password = this.loginFormGroup.value.password;
    console.log(username , password);

  }
}
