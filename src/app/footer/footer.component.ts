import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faFacebook, faInstagram, faYoutube,  } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FirebaseService } from '../firebase.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  facebookIcon = faFacebook;
  instagramIcon = faInstagram;
  youtubeIcon = faYoutube;
  emailIcon = faEnvelope;
  phoneIcon = faPhone;
  locationIcon = faMapMarkerAlt;

  subscribeData: any = <any>{};

  email = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
  ]);

  constructor(private subsribeService: FirebaseService) { }

  goToUrl(url: string): void {
    window.location.href = url;
  }

  ngOnInit(): void {
  }

  subscribe(subscribeForm: NgForm) {
    if (subscribeForm.invalid) {
      alert('Az email cím hibás');
    } else {
      this.subsribeService.subscribeTo(this.subscribeData)
        .subscribe(res => {
          alert('Sikeresen feliratkoztál a hírlevélre!');
        }, err => {
          console.log(err);
        });
    }
  }

}
