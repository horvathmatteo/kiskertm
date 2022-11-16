import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { KamraService } from 'src/app/services/kamra.service';
import { KiskertmService } from 'src/app/services/kiskertm.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {
  currentItem!: any;
  selectedFiles?: FileList;
  currentFileUpload?: Image;
  percentage = 0;
  error = false;
  message = "";
  title="";
  type="";

  constructor(private kamraService: KamraService, private uploadService: ImageUploadService) { }

  ngOnInit(): void {
    this.currentItem = {
      img: '',
      category: '',
      title: '',
      species: '',
      description: '',
      stock: 0,
      available: false,
      price: 0,
      total: 0,
      quantity: 1
    };
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles![0]);
  }

  upload(): void {
    if(this.selectedFiles) {
      this.currentFileUpload = new Image(this.selectedFiles[0]);
      this.uploadService.pushFileToStorage(this.currentFileUpload, this.currentItem).subscribe(
        percentage => {
          this.percentage = Math.round(percentage ? percentage : 0);
          // console.log(this.currentItem);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  saveItem() {
    this.currentItem.total = this.currentItem.price;
    this.kamraService.create(this.currentItem).then(() => {
      this.showPopUp("Sikeres mentés", "", "success");
      this.currentItem = {
        img: '',
        category: '',
        title: '',
        species: '',
        description: '',
        stock: 0,
        available: false,
        price: 0,
        total: 0,
        quantity: 1
      };
    });
  }

  isPlant(obj: any): boolean {
    // if(obj.species != undefined) {
    //   this.option = "plant";
    //   return true;
    // } else {
    //   this.option = "kamra";
    //   return false;
    // }
    return true;
  }

  setAvailable(event: any) {
    if(event.target.value == "true") {
      this.currentItem.available = true;
    } else if(event.target.value == "false") {
      this.currentItem.available = false;
      this.currentItem.stock = 0;
    }
  }

  showPopUp(title: string, message: string, type: string) {
    this.error = true;
    this.message = message;
    this.title = title;
    this.type = type;
    setTimeout(() => {this.error = false}, 2000);
  }

}
