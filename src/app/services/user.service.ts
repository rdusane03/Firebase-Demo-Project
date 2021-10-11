import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';
 
  usersRef: AngularFireList<User> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }

  addUser(user: any): void {
    this.usersRef.push(user);
  }

  getUsersList(): AngularFireList<User> {
    return this.usersRef;
  }

  updateUser(key: string, value: any): Promise<void> {
    return this.usersRef.update(key, value);
  }

  deleteUser(key: string): Promise<void> {
    return this.usersRef.remove(key);
  }
}
