import { Component, OnInit } from '@angular/core';
import { Kamra } from '../models/kamra.model';
import { KamraService } from '../services/kamra.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-kamraview',
  templateUrl: './kamraview.component.html',
  styleUrls: ['./kamraview.component.scss']
})
export class KamraviewComponent implements OnInit {

  kamras?: Kamra[];
  category?: any;
  categoryKamra?: Kamra[];

  constructor(private kamraService: KamraService, private title: Title, private route: ActivatedRoute) { 
    this.title.setTitle('Kiskert-M | Kamra');
  }

  ngOnInit(): void {
    this.categoryKamra = [];

    this.route.queryParams.subscribe(params => {
      this.categoryKamra = [];
      this.category = params.category;
      this.retrieveKamra();
    })
  }

  retrieveKamra(): void {
    this.kamraService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
          )
        )
    ).subscribe(data => {
      this.kamras = data;
      if(this.category === "összes") {
        this.categoryKamra = this.kamras;
      }else {
        this.kamras?.forEach(element => {
          if(element.category == this.category) {
          this.categoryKamra?.push(element);
          }
        });
      }
    });
  }

  filterByCategory(category: string): void {
    this.kamras?.forEach(element => {
      if(element.category == "összes") {
        this.categoryKamra?.push(element);
      } 
    });
  }

}
