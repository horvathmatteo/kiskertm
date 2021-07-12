import { Component, OnInit } from '@angular/core';
import { Kamra } from 'src/app/models/kamra.model';
import { KamraService } from 'src/app/services/kamra.service';

@Component({
  selector: 'app-add-kamra',
  templateUrl: './add-kamra.component.html',
  styleUrls: ['./add-kamra.component.scss']
})
export class AddKamraComponent implements OnInit {

  kamra: Kamra = new Kamra();
  submitted = false;

  constructor(private kamraService: KamraService) { }

  ngOnInit(): void {
  }

  saveKamra(): void {
    this.kamraService.create(this.kamra).then(() => {
      console.log('Created successfully');
      this.submitted = true;
    });
  }

  newKamra(): void {
    this.submitted = false;
    this.kamra = new Kamra();
  }

}
