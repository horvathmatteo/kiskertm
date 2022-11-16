import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { KamraService } from 'src/app/services/kamra.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService, private kamraService: KamraService) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut();
  }

}
