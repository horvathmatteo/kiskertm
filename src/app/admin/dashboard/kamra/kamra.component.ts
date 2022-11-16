import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Kamra } from 'src/app/models/kamra.model';
import { KamraService } from 'src/app/services/kamra.service';

@Component({
  selector: 'app-kamra',
  templateUrl: './kamra.component.html',
  styleUrls: ['./kamra.component.scss']
})
export class KamraComponent implements OnInit {
  kamra?: Kamra[];
  category = "összes";
  order = "";
  filterKeyword = "";
  categoryKamra?: Kamra[];
  suggestions?: any[];

  constructor(private kamraService: KamraService) { }

  ngOnInit(): void {
    this.categoryKamra = [];
    this.category = "összes";
    this.suggestions = [];
  
    this.retrieveKamra();
    this.filterByCategory(this.category);
  }

  retrieveKamra(): void {
    this.kamraService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
          )
        )
    ).subscribe(data => {
      this.kamra = data;
      if(this.category === "összes") {
        this.categoryKamra = this.kamra;
      }
    });
  }

  filterByCategory(category: string): void {
    this.categoryKamra = [];
    this.category = category;
    if(category === "összes") {
      this.categoryKamra = this.kamra
    } else {
      this.kamra?.forEach(element => {
        if(element.category == category) {
         this.categoryKamra?.push(element);
        }
      });
    }
  }

  orderBy(order: string) {
    const collator = new Intl.Collator('hu');
    if(order == "nameInc") {
      this.categoryKamra!.sort(function(a, b){
          return collator.compare(a.title!, b.title!);
      });
    } else if(order == "nameDec") {
      this.categoryKamra!.sort(function(a, b){
        return collator.compare(b.title!, a.title!);
      });
    } else if(order == "priceInc") {
      this.categoryKamra!.sort(function(a, b){
        if(a.price! < b.price!) { return -1; }
        if(a.price! > b.price!) { return 1; }
        return 0;
    })
    } else if(order == "priceDec") {
      this.categoryKamra!.sort(function(a, b){
        if(b.price! < a.price!) { return -1; }
        if(b.price! > a.price!) { return 1; }
        return 0;
    })
    }
  }

  autoComplete(keyword: any) {
    this.suggestions = this.categoryKamra?.filter(c => c.title?.toLowerCase().includes(keyword.target.value.toLowerCase())).slice(0,5);
  }

  applyFilter() {
    if(this.filterKeyword == "") {
      this.categoryKamra = this.kamra;
    } else {
      this.categoryKamra = this.categoryKamra?.filter(c => c.title?.toLowerCase().includes(this.filterKeyword.toLowerCase()));
    }
  }

}
