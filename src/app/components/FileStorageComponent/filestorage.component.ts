import { Component ,OnDestroy,OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {UploadListComponent} from '../UploadListComponent/uploadlist.component'
import firebase from 'firebase';

@Component({
  selector: 'file-storage',
  templateUrl: './filestorage.component.html'
})
export class FileStorageComponent implements OnInit, OnDestroy
{
  perf = firebase.performance();
  screenTrace: firebase.performance.Trace;
  ngOnInit()
   {
    this.screenTrace = this.perf.trace('FileStorageScreen');
    this.screenTrace.start();
  }

  ngOnDestroy(){
    this.screenTrace.stop();
  }
}