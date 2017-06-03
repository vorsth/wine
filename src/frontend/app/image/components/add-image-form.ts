import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth-service';
import { Image } from '../models/image';
import { ImageService } from '../services/image-service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'add-image-form',
  templateUrl: './add-image-form.html'
})
export class AddImageFormComponent {
  private loggedIn : boolean = false;

  private uploader: FileUploader = new FileUploader({
    url: "/api/image",
  });

  @Input() wineId: number = 0;

  constructor(private authService : AuthService, private router: Router, private imageService : ImageService){
    authService.check().subscribe(
      (logInStatus : boolean) => this.loggedIn = logInStatus,
      () => console.log("New Image Form Log In Fail"),
      () => console.log("New Image Form Log In Complete"),
    );
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('wineId', this.wineId);
      form.append('newId', 'hello');
    };
  }

  uploadFiles(){
    console.log("Upload Files" + this.wineId);
    this.uploader.uploadAll();
  }

}
