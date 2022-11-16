import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Kamra } from 'src/app/models/kamra.model';
import { KamraService } from 'src/app/services/kamra.service';

@Component({
  selector: 'app-kamra-list',
  templateUrl: './kamra-list.component.html',
  styleUrls: ['./kamra-list.component.scss']
})
export class KamraListComponent implements OnInit {

  kamras?: Kamra[];
  currentKamra?: Kamra;
  currentIndex = -1;
  title = '';

  constructor(private kamraService: KamraService) { }

  ngOnInit(): void {
    this.retrieveKamra();
  }

  refreshList(): void {
    this.currentKamra = undefined;
    this.currentIndex = -1;
    this.retrieveKamra();
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
    });
  }

  setActiveKamra(kamra: Kamra, index: number): void {
    this.currentKamra = kamra;
    this.currentIndex = index;
  }

}
