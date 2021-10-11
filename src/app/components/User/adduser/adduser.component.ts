import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  firstName: "Rashmi";

  constructor(private userService:UserService, private messageService:MessageService) { }
user:User;
  ngOnInit(): void {
    this.user= new User();
  }

 /**
   * Store a User to backend server
   */
  save() {
    try{
      console.log(this.user)
      this.userService.addUser(this.user);
      let msg = "Success -> Post a Customer: " 
                    + "<ul>"
                        + "<li>firstname: " + this.user.firstName + "</li>"
                        + "<li>lastname: " + this.user.lastName + "</li>"
                        + "<li>lastname: " + this.user.email + "</li>"
                        + "<li>age: " + this.user.age + "</li>"
                        + "<li>address: " + this.user.contactNumber + "</li>"
                    + "</ul>";
console.log("User added")
      this.messageService.add(msg);
    } catch(err){
      console.error(err);
      let msg = "Error! -> Action Posting a Customer:" 
                  + "<ul>"
                  + "<li>firstname: " + this.user.firstName + "</li>"
                  + "<li>lastname: " + this.user.lastName + "</li>"
                  + "<li>lastname: " + this.user.email + "</li>"
                  + "<li>age: " + this.user.age + "</li>"
                  + "<li>address: " + this.user.contactNumber + "</li>"
                  + "</ul>";

      this.messageService.add(msg);
    }
  }

  reset(){
    this.user = new User();
  }

  /**
   * Function handles form submitting
   */
  onSubmit() {
    
    console.log("Hii");
    this.save();
    this.reset();
  }


}
