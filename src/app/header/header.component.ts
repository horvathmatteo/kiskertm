import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isMenuCollapsed=true;
  subscribeData: any = <any>{};
  @ViewChild('closebutton') closebutton: any;

  email = new FormControl('', [
    Validators.required,
  	Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
  ]);

  constructor(
    private subscribeService: FirebaseService,
    private router: Router
  ) { }


  ngOnInit(): void {
  }

  subscribe(subscribeForm: NgForm) {
    if (subscribeForm.invalid) {
      return;
    }
    this.subscribeService.subscribeTo(this.subscribeData)
      .subscribe(res => {
        this.closebutton.nativeElement.click();
        this.router.navigate(['home']);
        alert('Sikeresen feliratkoztál a hírlevélre');
      }, err => {
        console.log(err);
      })
  }

}
