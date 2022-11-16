import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { Image } from '../models/image';
import { KamraService } from './kamra.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private basePath = '/uploads';
  private downloadURL?: Observable<any>;

  constructor(private storage: AngularFireStorage, private kamraService: KamraService) { }

  pushFileToStorage(image: Image, item: any): Observable<number | undefined> {
    const filePath = `${this.basePath}/${image.file!.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, image.file)
    
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = storageRef.getDownloadURL();
        this.downloadURL!.subscribe(url => {
          if(url) {
            item.img = url;
          }
        })
      })
    ).subscribe();
    
    return uploadTask.percentageChanges();
  }

  setImageUrl(imageURL: any, item: any) {
    item.img = imageURL;
    this.kamraService.update(item.id, item);
  }
}
