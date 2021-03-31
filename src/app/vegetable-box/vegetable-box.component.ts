import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-vegetable-box',
  templateUrl: './vegetable-box.component.html',
  styleUrls: ['./vegetable-box.component.scss']
})
export class VegetableBoxComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('Kiskert-M | Zöldségdoboz')
   }

  ngOnInit(): void {
  }

}
