import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-showuser',
  templateUrl: './showuser.component.html',
  styleUrls: ['./showuser.component.css']
})
export class ShowuserComponent implements OnInit {


  users: Array<User> = [];
  showUser: User;
  isSelected: boolean = false;
  deletedUser: User;
  returnedMessage: string;


  constructor(private userService:UserService, private messageService:MessageService) { }

  setUserDetails(user: User){
    this.isSelected=!this.isSelected;
    if(this.isSelected){
      this.showUser = user;
    }else{
      this.showUser = undefined;
    }
  }

  /**
   * Set deletedUser and reset returnedMessage = undefined
   * @param deleteUser
   */
  prepareDeleteUser(deleteUser: User){
    console.log(deleteUser)
    //assign delete-User
    this.deletedUser = deleteUser;
    // reset returned-Message
    //this.returnedMessage = undefined;
  }

 /**
   * Delete a User by ID
   */
  deleteUser(user: User){    
    this.deletedUser = user;
    this.userService.deleteUser(this.deletedUser.key)
              .then(() => {
                // remove a deletedUser from users list on view
                this.users = this.users.filter(user => {
                  return user.key != this.deletedUser.key;
                })

                // set a showing message in delete modal
                this.returnedMessage = "Delete Successfully a User with key = " + this.deletedUser.key;

                // just reset showUser for not showing on view
                this.showUser = undefined;

                // add the delete message to message app for showing
                this.messageService.add(this.returnedMessage);
              })
              .catch(error => {
                console.log(error);
                let errMsg: string = "Error! Details: " + error;
                this.messageService.add(errMsg);
              });
}


 /**
   * Update User function
   */
  updateUser() {

 
    var updatedUser = Object.assign({}, this.showUser);
    delete updatedUser.key;

    this.userService
      .updateUser(this.showUser.key, updatedUser)
                      .then(() => {
                          // update Users list
                          this.users.map(x => {
                            if(x.key == this.showUser.key){
                              x = this.showUser;
                            }
                          });

                          let msg: string = "Update Successfully! -> New User's properties: <br>"
                                            + "<ul>"
                                              + "<li>" + "id: " + this.showUser.key + "</li>"
                                              + "<li>" + "firstname: " + this.showUser.firstName + "</li>"
                                              + "<li>" +  "lastname: " + this.showUser.lastName + "</li>"
                                              + "<li>" +  "email: " + this.showUser.email + "</li>"
                                              + "<li>" +  "age: " + this.showUser.age + "</li>"
                                              + "<li>" +  "contact no: " + this.showUser.contactNumber + "</li>"
                                            + "</ul>";
                          this.messageService.add(msg);
                      })
                      .catch(error => {
                        console.log(error);
                        let errMsg = "Update Fail ! Error = " + error;
                        this.messageService.add(errMsg);
                      });

                      this.showUser= null;
  }

  /**
   * Retrieve all User from Backend
   */
  retrieveAllUsers() {
    this.userService.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(users => {
      this.users = users;
    }, (error) => {
      console.log(error);
    });           
  }




  ngOnInit(): void {
    this.retrieveAllUsers();
  }

}
