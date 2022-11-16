import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() items?: any[];
  currentItem: any;

  constructor() { }

  ngOnInit(): void {
    
  }

  setCurrentItem(item: any) {
    this.currentItem = item;
  }
}
