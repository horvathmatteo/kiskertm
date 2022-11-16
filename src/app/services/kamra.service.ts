import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Plant } from '../models/plant.model';
import * as firebase from 'firebase';
import { Kamra } from '../models/kamra.model';

@Injectable({
  providedIn: 'root'
})
export class KamraService {

  private dbPath = '/kamra';

  plantsRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.plantsRef = db.collection(this.dbPath);
   }

  getAll(): AngularFirestoreCollection<any> {
    return this.plantsRef;
  }

  create(plant: Plant): any {
    return this.plantsRef.add({...plant});
  }

  update(id: string, data: any): Promise<void> {
    return this.plantsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.plantsRef.doc(id).delete();
  }

  decreaseStock(items: any[]) {
    items.forEach(item => {
      if((item.stock - item.quantity) <= 0) {
        const increaseBy = firebase.default.firestore.FieldValue.increment(-item.quantity);
        this.plantsRef.doc(item.id).update({
          stock: increaseBy,
          available: false
        });
      } else {
        const increaseBy = firebase.default.firestore.FieldValue.increment(-item.quantity);
        this.plantsRef.doc(item.id).update({
          stock: increaseBy
        });
      }
    })
  }
}
