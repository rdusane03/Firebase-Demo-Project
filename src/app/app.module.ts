import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirePerformanceModule } from '@angular/fire/performance';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/LoginComponent/login.component';
import { HomeComponent } from './components/HomeComponent/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService} from './services/auth.service';
import { UploadFileComponent } from './components/UploadFileComponent/uploadfile.component';
import { UploadListComponent } from './components/UploadListComponent/uploadlist.component'
import { FileStorageComponent } from './components/FileStorageComponent/filestorage.component';
import { UploadDetailsComponent } from './components/UploadDetailsComponent/uploaddetails.component';
import { FirestoreDataService } from './services/firestore-data.service';
import { FireStoreComponent } from './components/FireStoreComponent/firestore.component'
import { AdduserComponent } from './components/user/adduser/adduser.component';
import { ShowuserComponent } from './components/user/showuser/showuser.component';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const firebaseConfig = {
  apiKey: "AIzaSyB3wngSpBQr3RbAOoD7Nk_-wbRICo_9JUg",
  authDomain: "demo1-3d9d9.firebaseapp.com",
  projectId: "demo1-3d9d9",
  storageBucket: "demo1-3d9d9.appspot.com",
  messagingSenderId: "55237211442",
  appId: "1:55237211442:web:c8703cf118711b7434d32b",
  measurementId: "G-JRGTGC0RXE"
};

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'login' },
  { path : 'login', component: LoginComponent },
  { path :'home', component: HomeComponent , children: [
  {path : 'filestorage', component : FileStorageComponent},
  {path : 'firestore', component : FireStoreComponent},
    {path : 'firebasedatabase', component : FireStoreComponent},
    {path : 'adduser', component : AdduserComponent},
    {path : 'showuser', component : ShowuserComponent},
  ]},
];


@NgModule({
  declarations: [
    AppComponent,LoginComponent, HomeComponent, FileStorageComponent, UploadListComponent, UploadDetailsComponent, UploadFileComponent, AdduserComponent, ShowuserComponent , FireStoreComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, //firestore
    AngularFireDatabaseModule, //database
    AngularFirePerformanceModule, //performance
    RouterModule,
    


  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
