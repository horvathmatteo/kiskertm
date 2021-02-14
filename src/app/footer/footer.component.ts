import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  facebookIcon = faFacebook;
  instagramIcon = faInstagram;
  youtubeIcon = faYoutube;
  emailIcon = faEnvelope;
  phoneIcon = faPhone;
  constructor() { }

  goToUrl(url: string): void {
    window.location.href = url;
  }

  ngOnInit(): void {
  }

}
