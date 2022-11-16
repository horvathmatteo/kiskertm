import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  
  @Input() message: any;
  @Input() title: any;
  @Input() type: any;
  @Output() close = new EventEmitter<void>();
  @ViewChild('myModal2') modal: any;

  constructor() { 
    //console.log(this.modal)
  }

  ngOnInit(): void {
    document.getElementById("mod")?.click();
  }



  onCloseClick() {
    this.close.emit();
  }

}
