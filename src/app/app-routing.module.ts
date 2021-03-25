import { NgModule } from '@angular/core';
import { Routes, RouterModule, NavigationEnd, Router } from '@angular/router';
import { AddPlantComponent } from './components/add-plant/add-plant.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { HomeComponent } from './home/home.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { OrderComponent } from './order/order.component';
import { PlantsviewComponent } from './plantsview/plantsview.component';
import { VegetableBoxComponent } from './vegetable-box/vegetable-box.component';

const routes: Routes = [
  { path: 'home',
    component: HomeComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'vegetable-box',
    component: VegetableBoxComponent
  },
  {
    path: 'newsletter',
    component: NewsletterComponent
  },
  {
    path: 'api/plant/add',
    component: AddPlantComponent
  },
  {
    path: 'api/plant/plants',
    component: PlantListComponent
  },
  {
    path: 'plants',
    component: PlantsviewComponent
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

declare let ga: Function;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

  constructor(public router: Router) {

    // subscribe to router events and send page views to Google Analytics
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');

      }

    });
  }
 }
