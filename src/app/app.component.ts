import { getHtmlTagDefinition } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'kiskertm';

  constructor(private router: Router){
    this.router.events.subscribe(event => {
      if( event instanceof NavigationEnd) {
        gtag('config', 'G-B5EJ7FF1G8', {
          'page_path': event.urlAfterRedirects
        })
      }
    });
  }
}
