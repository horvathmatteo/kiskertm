import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Kamra } from '../models/kamra.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: any[] = [];
  private session = new Subject<any>();
  counter = 0;

  constructor() { }

  addToCart(plant: any) {
    this.items = JSON.parse(sessionStorage.getItem('products')!);
    if (this.items == null) {
      this.items = [];
    }
    if(this.items.length == 0 || !this.items.includes(plant) ){
      this.items.push(plant);
      sessionStorage.setItem('products', JSON.stringify(this.items));
      var counter = parseInt(sessionStorage.getItem('counter')!);
      this.sendNumber(counter + 1);
      sessionStorage.setItem('counter', JSON.stringify(counter! + 1));
    }
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    sessionStorage.setItem('products', JSON.stringify(this.items));
    sessionStorage.setItem('counter', JSON.stringify(0));
    this.sendNumber(0);
  }

  sendNumber(number:number){
    this.session.next({text:number});
  }

  getNumber():Observable<any>{
    return this.session.asObservable();
  }
}
