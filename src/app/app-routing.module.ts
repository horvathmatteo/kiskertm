import { NgModule } from '@angular/core';
import { Routes, RouterModule, NavigationEnd, Router } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { AddPlantComponent } from './components/add-plant/add-plant.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { PostListComponent } from './components/post-list/post-list.component';
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
