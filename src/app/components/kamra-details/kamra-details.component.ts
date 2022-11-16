import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Kamra } from 'src/app/models/kamra.model';
import { KamraService } from 'src/app/services/kamra.service';

@Component({
  selector: 'app-kamra-details',
  templateUrl: './kamra-details.component.html',
  styleUrls: ['./kamra-details.component.scss']
})
export class KamraDetailsComponent implements OnInit, OnChanges {

  @Input() kamra?: Kamra;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentKamra: Kamra = {
    img: '',
    category: '',
    title: '',
    description: '',
    ml: '',
    price: undefined,
    published: false
  };
  message = '';

  constructor(private kamraService: KamraService) { }

  ngOnChanges(): void {
    this.message = '';
    this.currentKamra = { ...this.kamra};
  }

  ngOnInit(): void {
    this.message = '';
  }

  updatePublished(status: boolean): void {
    if (this.currentKamra.id) {
      this.kamraService.update(this.currentKamra.id, { published: status})
      .then(() => {
        this.currentKamra.published = status;
        this.message = 'The status was updated successfully';
      })
      .catch(err => console.log(err));
    }
  }

  updateKamra(): void {
    const data = {
      img: this.currentKamra.img,
      category: this.currentKamra.category,
      title: this.currentKamra.title,
      description: this.currentKamra.description,
      ml: this.currentKamra.ml,
      price_one: this.currentKamra.price
    };

    if(this.currentKamra.id) {
      this.kamraService.update(this.currentKamra.id, data)
        .then(() => this.message = 'Updated successfully')
        .catch(err => console.log(err));
    }
  }

  deleteKamra(): void {
    if(this.currentKamra.id) {
      this.kamraService.delete(this.currentKamra.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'Updated successfully';
        })
        .catch(err => console.log(err));
    }
  }

}
