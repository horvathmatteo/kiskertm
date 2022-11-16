import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Plant } from 'src/app/models/plant.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { KiskertmService } from 'src/app/services/kiskertm.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  plants?: Plant[];
  category = "összes";
  categoryPlants?: Plant[];

  constructor(private authService: AuthService, private route: ActivatedRoute, private plantService: KiskertmService) { }

  ngOnInit(): void {
    this.categoryPlants = [];
    this.category = "összes";
  
    this.retrievePlants();
    this.filterByCategory(this.category);
  }

  signOut() {
    this.authService.signOut();
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
}
