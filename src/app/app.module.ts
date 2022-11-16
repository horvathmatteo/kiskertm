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
import { AngularFireFunctionsModule } from '@angular/fire/functions';
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
import { KamraComponent } from './admin/dashboard/kamra/kamra.component';
import { AddKamraComponent } from './components/add-kamra/add-kamra.component';
import { KamraDetailsComponent } from './components/kamra-details/kamra-details.component';
import { KamraListComponent } from './components/kamra-list/kamra-list.component';
import { KamraviewComponent } from './kamraview/kamraview.component';
import { JamOrderComponent } from './jam-order/jam-order.component';
import { CartComponent } from './cart/cart.component';
import { PopupComponent } from './shared/popup/popup.component';
import { AlertComponent } from './shared/alert/alert.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { CardComponent } from './admin/shared/card/card.component';
import { StockComponent } from './admin/dashboard/stock/stock.component';
import { NavComponent } from './admin/shared/nav/nav.component';
import { PlantsComponent } from './admin/dashboard/plants/plants.component';
import { DialogComponent } from './admin/shared/dialog/dialog.component';
import { AddDialogComponent } from './admin/shared/add-dialog/add-dialog.component';
import { KamraCardComponent } from './admin/shared/card/kamra-card/kamra-card.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { KamraOrderComponent } from './kamra-order/kamra-order.component';
import { ChristmasPresentComponent } from './christmas-present/christmas-present.component';

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
    KamraComponent,
    AddKamraComponent,
    KamraDetailsComponent,
    KamraListComponent,
    KamraviewComponent,
    JamOrderComponent,
    CartComponent,
    PopupComponent,
    AlertComponent,
    DashboardComponent,
    LoginComponent,
    CardComponent,
    StockComponent,
    NavComponent,
    PlantsComponent,
    DialogComponent,
    AddDialogComponent,
    KamraCardComponent,
    KamraOrderComponent,
    ChristmasPresentComponent
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
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    RichTextEditorModule,
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
