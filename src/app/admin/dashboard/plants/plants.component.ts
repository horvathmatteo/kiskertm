import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Plant } from 'src/app/models/plant.model';
import { KiskertmService } from 'src/app/services/kiskertm.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.scss']
})
export class PlantsComponent implements OnInit {
  plants?: Plant[];
  category = "összes";
  order = "";
  filterKeyword = "";
  categoryPlants?: Plant[];
  suggestions?: any[];

  constructor(private plantService: KiskertmService) { }

  ngOnInit(): void {
    this.categoryPlants = [];
    this.category = "összes";
    this.suggestions = [];
  
    this.retrievePlants();
    this.filterByCategory(this.category);
  }

  retrievePlants(): void {
    this.plantService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
          )
        )
    ).subscribe(data => {
      this.plants = data;
      if(this.category === "összes") {
        this.categoryPlants = this.plants
      }
    });
  }

  filterByCategory(category: string): void {
    this.categoryPlants = [];
    this.category = category;
    if(category === "összes") {
      this.categoryPlants = this.plants
    } else {
      this.plants?.forEach(element => {
        if(element.category == category) {
         this.categoryPlants?.push(element);
        }
      });
    }
  }

  orderBy(order: string) {
    const collator = new Intl.Collator('hu');
    if(order == "nameInc") {
      this.categoryPlants!.sort(function(a, b){
          return collator.compare(a.species!, b.species!);
      });
    } else if(order == "nameDec") {
      this.categoryPlants!.sort(function(a, b){
        return collator.compare(b.species!, a.species!);
      });
    } else if(order == "priceInc") {
      this.categoryPlants!.sort(function(a, b){
        if(a.price_one! < b.price_one!) { return -1; }
        if(a.price_one! > b.price_one!) { return 1; }
        return 0;
    })
    } else if(order == "priceDec") {
      this.categoryPlants!.sort(function(a, b){
        if(b.price_one! < a.price_one!) { return -1; }
        if(b.price_one! > a.price_one!) { return 1; }
        return 0;
    })
    }
  }

  autoComplete(keyword: any) {
    this.suggestions = this.categoryPlants?.filter(c => c.species?.toLowerCase().includes(keyword.target.value.toLowerCase())).slice(0,5);
  }

  applyFilter() {
    if(this.filterKeyword == "") {
      this.categoryPlants = this.plants;
    } else {
      this.categoryPlants = this.categoryPlants?.filter(c => c.species?.toLowerCase().includes(this.filterKeyword.toLowerCase()));
    }
  }
}
