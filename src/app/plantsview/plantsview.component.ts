import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Plant } from '../models/plant.model';
import { KiskertmService } from '../services/kiskertm.service';

@Component({
  selector: 'app-plantsview',
  templateUrl: './plantsview.component.html',
  styleUrls: ['./plantsview.component.scss']
})
export class PlantsviewComponent implements OnInit {

  plants?: Plant[];
  category?: any;

  constructor(private plantService: KiskertmService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params.category;
      console.log(this.category);
    });
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

}
