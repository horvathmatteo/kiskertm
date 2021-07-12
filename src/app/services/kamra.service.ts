import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Plant } from '../models/plant.model';

@Injectable({
  providedIn: 'root'
})
export class KamraService {

  private dbPath = '/kamra';

  plantsRef: AngularFirestoreCollection<Plant>;

  constructor(private db: AngularFirestore) {
    this.plantsRef = db.collection(this.dbPath);
   }

  getAll(): AngularFirestoreCollection<Plant> {
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
}
