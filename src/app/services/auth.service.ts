import { Injectable } from  '@angular/core';
import * as Firebase from 'firebase/app';
import { AngularFireAuth  } from  "@angular/fire/auth";
import { Router } from '@angular/router';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn:  'root'
})

export class AuthService {
    
    private loggedIn = new BehaviorSubject<boolean>(false);
    perf = firebase.performance();
    constructor(public afAuth:  AngularFireAuth, public  router:  Router) {}
    get isLoggedIn() {
        if(localStorage.getItem('user') != null){
            this.loggedIn.next(true);
            
        }
        else if( localStorage.getItem('user') == null || localStorage.getItem('user') == undefined){{
            this.loggedIn.next(false);
            this.router.navigate(['/login']);
        }}
        return this.loggedIn.asObservable(); // {2}
      }

    async login(email:string,password: string){
        const trace = this.perf.trace('userLogin');
        trace.start();

        try {
            const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
            trace.putAttribute('verified', `${credential.user.email}`);
            trace.stop();
            localStorage.setItem('user','active');
            this.router.navigate(['/home']);
            this.loggedIn.next(true);
        }
        catch(err)
        { 
            trace.putAttribute('errorCode', err.code);
            trace.stop();
        }
        
    }

    async loginGoogle(){
            await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
            localStorage.setItem('user','active');
            this.loggedIn.next(true);
            this.router.navigate(['/home']);
        }

    async loginFacebook(){

        await this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
        localStorage.setItem('user','active');
        this.loggedIn.next(true);
        this.router.navigate(['/home']);
    }

    // async signUp(email:string,password: string){
    //     var result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    //     this.afAuth.sendSignInLinkToEmail(email, this.actionCodeSettings);
    // }

    async logout(){
        this.loggedIn.next(false);
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }
    }

