import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
 styleUrls:['./login.component.css'] 
})
export class LoginComponent {
  Username : string = "p2s2.home@gmail.com";
  password : string = "P2S2@1234";

  constructor(private auth : AuthService , private router : Router){
  }
  Login(){ 
      console.log("Login with Normal user id and password");
      this.auth.login(this.Username,this.password);
  }

  LoginGoogle(){
    console.log("Login with Google");
    this.auth.loginGoogle();
  }

  LoginFacebook(){

    console.log("Login with Facebook");
    this.auth.loginFacebook();
  }
  NavigateToSignup(){
    this.router.navigate(['/signup']);
  }

}
