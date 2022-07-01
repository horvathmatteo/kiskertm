import { NgModule } from '@angular/core';
import { Routes, RouterModule, NavigationEnd, Router } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { CartComponent } from './cart/cart.component';
import { AddKamraComponent } from './components/add-kamra/add-kamra.component';
import { AddPlantComponent } from './components/add-plant/add-plant.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { KamraListComponent } from './components/kamra-list/kamra-list.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { HomeComponent } from './home/home.component';
import { JamOrderComponent } from './jam-order/jam-order.component';
import { KamraComponent } from './kamra/kamra.component';
import { KamraviewComponent } from './kamraview/kamraview.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { OrderComponent } from './order/order.component';
import { PlantsviewComponent } from './plantsview/plantsview.component';
import { PopupComponent } from './shared/popup/popup.component';
import { VegetableBoxComponent } from './vegetable-box/vegetable-box.component';
import { VegetablesComponent } from './vegetables/vegetables.component';

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
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'blog/:id',
    component: BlogpostComponent
  },
  {
    path: 'api/plant/add',
    component: AddPlantComponent
  },
  {
    path: 'api/post/add',
    component: AddPostComponent
  },
  {
    path: 'api/kamra/add',
    component: AddKamraComponent
  },
  {
    path: 'api/kamra/list',
    component: KamraListComponent
  },
  {
    path: 'api/plant/plants',
    component: PlantListComponent
  },
  {
    path: 'api/post/posts',
    component: PostListComponent
  },
  {
    path: 'plants',
    component: PlantsviewComponent
  },
  {
    path: 'vegetables',
    component: VegetablesComponent
  },
  {
    path: 'kamra',
    component: KamraviewComponent
  },
  {
    path: 'kamra-order',
    component: JamOrderComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'popup',
    component: PopupComponent
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
