import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import { VegetableBoxComponent } from './vegetable-box/vegetable-box.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AddPlantComponent } from './components/add-plant/add-plant.component';
import { PlantDetailsComponent } from './components/plant-details/plant-details.component';
import { PlantListComponent } from './components/plant-list/plant-list.component';
import { PlantsviewComponent } from './plantsview/plantsview.component';
import { OrderComponent } from './order/order.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { BlogComponent } from './blog/blog.component';
import { BlogpostComponent, SafeHtmlPipe } from './blogpost/blogpost.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { DatePipe } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
import { registerLocaleData } from '@angular/common';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { VegetablesComponent } from './vegetables/vegetables.component';
import { KamraComponent } from './kamra/kamra.component';

registerLocaleData(localeHu, 'hu');

const routes: Routes = [

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    VegetableBoxComponent,
    NewsletterComponent,
    AddPlantComponent,
    PlantDetailsComponent,
    PlantListComponent,
    PlantsviewComponent,
    OrderComponent,
    BlogComponent,
    BlogpostComponent,
    AddPostComponent,
    PostListComponent,
    PostDetailsComponent,
    SafeHtmlPipe,
    VegetablesComponent,
    KamraComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    MatCardModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RichTextEditorModule
  ],
  providers: [
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
      {
        window.location.href = (route.data as any).externalUrl;
      }
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
