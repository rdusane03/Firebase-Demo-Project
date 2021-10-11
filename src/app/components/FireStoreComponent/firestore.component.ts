import { Component ,OnInit } from '@angular/core';
import { FirestoreDataService } from './../../services/firestore-data.service';
import { User } from './../../models/user'; 

@Component({
  selector: 'fire-store',
  templateUrl: './firestore.component.html'
})
export class FireStoreComponent implements OnInit
  {
  arr: User[] = []; 
  receivedUsers : any; 
  Users = new Array();
  model = { firstName: '', lastName: '', mobile: '' };
 
  constructor(public fireService : FirestoreDataService) {  
  }  
    
    ngOnInit(){
      this.fireService.getUsers().subscribe(res =>{
        this.receivedUsers = res;
        this.receivedUsers.forEach(element => {
          element =  element.payload.doc.data();
          this.Users.push(element);
          
        });
        
        console.log(this.Users)
      },
      error =>{
        console.log(error);
      });
     

    }

    userSubmit() { 
      this.fireService.addUser(this.model);  
      this.model.firstName = '';  
      this.model.lastName = '';  
      this.model.mobile = ''; 
      
    }
}