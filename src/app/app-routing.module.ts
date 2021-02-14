import { NgModule } from '@angular/core';
import { Routes, RouterModule, NavigationEnd, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { OrderComponent } from './order/order.component';
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
