import { Component, OnInit, ViewChild } from '@angular/core';
import { Kamra } from '../models/kamra.model';
import { KamraService } from '../services/kamra.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-kamraview',
  templateUrl: './kamraview.component.html',
  styleUrls: ['./kamraview.component.scss']
})
export class KamraviewComponent implements OnInit {

  kamras?: Kamra[];
  category?: any;
  categoryKamra?: Kamra[];
  isCollapsed = false;
  inCart!: any[];
  error = false;
  message = "";
  title="";
  type="";

  constructor(private kamraService: KamraService, private titleServ: Title, private route: ActivatedRoute,
    public cartService: CartService) { 
    this.titleServ.setTitle('Kiskert-M | Kamra');
  }

  ngOnInit(): void {
    this.categoryKamra = [];

    this.route.queryParams.subscribe(params => {
      this.categoryKamra = [];
      this.category = params.category;
      this.retrieveKamra();
      this.inCart = JSON.parse(sessionStorage.getItem('products')!);
    });
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

  addToCart(product: Kamra) {
    this.cartService.addToCart(product);
    this.showPopUp("Siker!", "A termék sikeresen a kosaradba került", "success");
  }

  showPopUp(title: string, message: string, type: string) {
    this.error = true;
    this.message = message;
    this.title = title;
    this.type = type;
    setTimeout(() => {this.error = false}, 2000);
  }


}
