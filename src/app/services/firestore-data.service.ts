import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})

export class FirestoreDataService {
   
    constructor(public firestore: AngularFirestore) {
        
    }

    getUsers() {
        return this.firestore.collection("Users").snapshotChanges();
    }
    addUser(user) {     
        return new Promise<any>((resolve, reject) =>{
            this.firestore
                .collection("Users")
                .add(user)
                .then(res => {}, err => reject(err));
    })
    }
    deleteUser(user) {
        this.firestore.collection("users").doc().delete();
        
    }
}