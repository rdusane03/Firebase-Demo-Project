import { Component , Input } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from '../../models/file-upload';
@Component({
  selector: 'upload-details',
  templateUrl: './uploaddetails.component.html',
 styleUrls:['./uploaddetails.component.css'] 
})

export class UploadDetailsComponent{
    @Input() fileUpload: FileUpload;

    constructor(private uploadService: FileUploadService) { }

  
    deleteFileUpload(fileUpload): void {
      this.uploadService.deleteFile(fileUpload);
    }
  }