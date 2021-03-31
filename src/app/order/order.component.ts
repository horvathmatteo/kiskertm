import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('Kiskert-M | Palántarendelés')
   }

  ngOnInit(): void {
  }

}
