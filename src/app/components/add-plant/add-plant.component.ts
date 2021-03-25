import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/models/plant.model';
import { KiskertmService } from 'src/app/services/kiskertm.service';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss']
})
export class AddPlantComponent implements OnInit {

  plant: Plant = new Plant();
  submitted = false;
  categories = ['paprika', 'paradicsom', 'káposztafélék', 'tökfélék', 'saláták', 'uborka', 'fűszerek', 'egyéb'];

  constructor(private plantService: KiskertmService) { }

  ngOnInit(): void {
  }

  savePlant(): void {
    this.plantService.create(this.plant).then(() => {
      console.log('Created successfully');
      this.submitted = true;
    });
  }

  newPlant(): void {
    this.submitted = false;
    this.plant = new Plant();
  }

}
