import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Plant } from '../models/plant.model';
import { CartService } from '../services/cart.service';
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
  error = false;
  message = "";
  title="";
  type="";

  constructor(private plantService: KiskertmService, private route: ActivatedRoute, private title2: Title,
    private cartService: CartService) {
    this.title2.setTitle('Kiskert-M | Palánták')
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

  addToCart(product: Plant) {
    this.cartService.addToCart(product);
    this.showPopUp("Siker!", "A termék sikeresen a kosaradba került", "success");
    // var counter = parseInt(sessionStorage.getItem('counter')!);
    // this.cartService.sendNumber(counter + 1);
    // sessionStorage.setItem('counter', JSON.stringify(counter! + 1));
  }

  showPopUp(title: string, message: string, type: string) {
    this.error = true;
    this.message = message;
    this.title = title;
    this.type = type;
    setTimeout(() => {this.error = false}, 2000);
  }
}
