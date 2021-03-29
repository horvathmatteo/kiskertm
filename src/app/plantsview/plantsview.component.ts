import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Plant } from '../models/plant.model';
import { KiskertmService } from '../services/kiskertm.service';

@Component({
  selector: 'app-plantsview',
  templateUrl: './plantsview.component.html',
  styleUrls: ['./plantsview.component.scss']
})
export class PlantsviewComponent implements OnInit, OnChanges {

  plants?: Plant[];
  category?: any;
  categoryPlants?: Plant[];

  constructor(private plantService: KiskertmService, private route: ActivatedRoute) {
   }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.categoryPlants = [];
    
    this.route.queryParams.subscribe(params => {
      this.categoryPlants = [];
      this.category = params.category;
      this.retrievePlants();
    });
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
        this.categoryPlants = this.plants;
      }else {
        this.plants?.forEach(element => {
          if(element.category == this.category) {
          this.categoryPlants?.push(element);
          }
        });
      }
    });
  }

  filterByCategory(category: string): void {
    this.plants?.forEach(element => {
      if(element.category == "összes") {
        this.categoryPlants?.push(element);
      } 
    });
  }

}
