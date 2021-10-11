import { Component ,OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css'] 
})
export class HomeComponent implements OnInit {
  selectedNav : String;
  isLoggedIn$: Observable<boolean>;
  constructor(private auth : AuthService){


  }

  ngOnInit(){
    this.isLoggedIn$ = this.auth.isLoggedIn;
  }


   logout = () => {
    this.auth.logout();
  }
  
  navigation = (input) =>{
    console.log(input.target.id);
    this.selectedNav = input.target.id;
  }
  
}
