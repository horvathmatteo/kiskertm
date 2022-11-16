import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { KamraService } from 'src/app/services/kamra.service';

@Component({
  selector: 'app-kamra-card',
  templateUrl: './kamra-card.component.html',
  styleUrls: ['./kamra-card.component.scss']
})
export class KamraCardComponent implements OnInit {
  @Input() items?: any[];
  currentItem: any;

  constructor(private kamraService: KamraService) { }

  ngOnInit(): void {
  }

  setCurrentItem(item: any) {
    this.currentItem = item;
  }

  delete(item: any) {
    if(confirm("Biztos, hogy törölni szeretnéd?")){
      this.kamraService.delete(item.id);
    }
  }
}
