import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { KamraService } from 'src/app/services/kamra.service';
import { KiskertmService } from 'src/app/services/kiskertm.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() currentItem!: any;
  option!: string;
  selectedFiles?: FileList;
  currentFileUpload?: Image;
  percentage = 0;
  error = false;
  message = "";
  title="";
  type="";

  constructor(private plantService: KiskertmService, private kamraService: KamraService, private uploadService: ImageUploadService) { 

  }

  ngOnInit(): void {
    this.currentItem = {
      img: '',
      category: '',
      title: '',
      species: '',
      description: '',
      stock: 0,
      available: false,
      price: 0
      // price_one: undefined,
      // price_two: undefined,
    };
  }

  isPlant(obj: any): boolean {
    if(obj.species != undefined) {
      this.option = "plant";
      return true;
    } else {
      this.option = "kamra";
      return false;
    }
  }

  updateItem() {
    this.showSpinner(1)
    if(true) {
      this.kamraService.update(this.currentItem.id, this.currentItem).then(() => {
        this.showPopUp("Sikeres módosítás", "", "success");
        this.showSpinner(0);
      }).catch((error) => {
        this.showPopUp("Sikertelen módosítás", error, "error");
        this.showSpinner(0);
      });
    }
    // } else if (this.option == "plant") {
    //   this.plantService.update(this.currentItem.id, this.currentItem).then(() => {
    //     this.showPopUp("Sikeres módosítás", "", "success");
    //     this.showSpinner(0);
    //   }).catch((error) => {
    //     this.showPopUp("Sikertelen módosítás", error, "error");
    //     this.showSpinner(0);
    //   });
    // }
  }

  showPopUp(title: string, message: string, type: string) {
    this.error = true;
    this.message = message;
    this.title = title;
    this.type = type;
    setTimeout(() => {this.error = false}, 2000);
  }

  private showSpinner(option: number){
    var overlay = document.getElementById("overlay");
    if(option == 1) {
      overlay!.style.display = "block";
    }
    if(option == 0) {
      overlay!.style.display = "none";
    }
  }

  setAvailable(event: any) {
    if(event.target.value == "true") {
      this.currentItem.available = true;
    } else if(event.target.value == "false") {
      this.currentItem.available = false;
      this.currentItem.stock = 0;
    }
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
  
}
