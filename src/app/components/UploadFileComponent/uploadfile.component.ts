
import { Component , OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from '../../models/file-upload';

@Component({
  selector: 'upload-file',
  templateUrl: './uploadfile.component.html',
 styleUrls:['./uploadfile.component.css'] 
})

export class UploadFileComponent {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);

        setTimeout(() => {
          if(this.percentage == 100)
          { 
            this.currentFileUpload = null;
          }
        }, 5000);
      },
      error => {
        console.log(error);
      }
    );
    
  }
  }