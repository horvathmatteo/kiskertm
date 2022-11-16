import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = false;
  message = "";
  title="";
  type="";
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private titleService: Title, private authService: AuthService, private router: Router) {
    this.titleService.setTitle("Kiskert-M Admin - Bejelentkezés");
  }

  ngOnInit(): void {
  }

  public signIn() {
    this.showSpinner(1);
    this.authService.signIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then(() => {
      this.showSpinner(0);
      this.router.navigate(["/admin/dashboard"]);
    }).catch(error => {
      console.log(error);
      this.showPopUp("Hiba", "Nem sikerült a bejelentkezés", "error");
    });
  }

  private showSpinner(option: number){
    var overlay = document.getElementById("overlay");
    if(option == 1) {
      overlay!.style.display = "block";
    }
    if(option == 0) {
      overlay!.style.display = "none";
    }
  }

  private showPopUp(title: string, message: string, type: string) {
    this.error = true;
    this.message = message;
    this.title = title;
    this.type = type;
  }

}
