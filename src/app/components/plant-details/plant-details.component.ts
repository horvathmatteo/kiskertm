import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Plant } from 'src/app/models/plant.model';
import { KiskertmService } from 'src/app/services/kiskertm.service';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.scss']
})
export class PlantDetailsComponent implements OnInit, OnChanges {

  @Input() plant?: Plant;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentPlant: Plant = {
    img: '',
    category: '',
    species: '',
    description: '',
    price_one: undefined,
    price_two: undefined,
    published: false
  };
  message = '';

  constructor(private plantService: KiskertmService) { }

  ngOnChanges(): void {
    this.message = '';
    this.currentPlant = { ...this.plant };
  }

  ngOnInit(): void {
    this.message = '';
  }

  updatePublished(status: boolean): void {
    if (this.currentPlant.id) {
      this.plantService.update(this.currentPlant.id, { published: status})
      .then(() => {
        this.currentPlant.published = status;
        this.message = 'The status was updated successfully';
      })
      .catch(err => console.log(err));
    }
  }

  updatePlant(): void {
    const data = {
      img: this.currentPlant.img,
      category: this.currentPlant.category,
      species: this.currentPlant.species,
      description: this.currentPlant.description,
      price_one: this.currentPlant.price_one,
      price_two: this.currentPlant.price_two,
    };

    if(this.currentPlant.id) {
      this.plantService.update(this.currentPlant.id, data)
        .then(() => this.message = 'Updated successfully')
        .catch(err => console.log(err));
    }
  }

  deletePlant(): void {
    if(this.currentPlant.id) {
      this.plantService.delete(this.currentPlant.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'Updated successfully';
        })
        .catch(err => console.log(err));
    }
  }

}
