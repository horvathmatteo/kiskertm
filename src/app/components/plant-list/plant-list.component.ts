import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/models/plant.model';
import { KiskertmService } from 'src/app/services/kiskertm.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit {

  plants?: Plant[];
  currentPlant?: Plant;
  currentIndex = -1;
  title = '';

  constructor(private plantService: KiskertmService) { }

  ngOnInit(): void {
    this.retrievePlants();
  }

  refreshList(): void {
    this.currentPlant = undefined;
    this.currentIndex = -1;
    this.retrievePlants();
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
    });
  }

  setActivePlant(plant: Plant, index: number): void {
    this.currentPlant = plant;
    this.currentIndex = index;
  }

}
