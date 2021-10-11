import { Component ,OnInit } from '@angular/core';
import {AngularFireDatabase ,AngularFireList} from '@angular/fire/database'
import { Observable, observable } from 'rxjs';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Username : string = "p2s2.home@gmail.com";
  password : string = "P2S2@1234";
  isLoggedIn$: Observable<boolean>;
  constructor(private auth : AuthService){


  }

  ngOnInit(){
    this.isLoggedIn$ = this.auth.isLoggedIn;
  }

  submit(){

      this.auth.login(this.Username,this.password);
      console.log(this.Username,"Username");
      console.log(this.password,"Password");
           
  }

  logout(){
    console.log("Logout Action")
  }

}
