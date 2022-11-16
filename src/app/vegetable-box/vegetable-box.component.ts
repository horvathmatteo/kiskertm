import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-vegetable-box',
  templateUrl: './vegetable-box.component.html',
  styleUrls: ['./vegetable-box.component.scss']
})
export class VegetableBoxComponent implements OnInit {

  form: FormGroup;
  name: FormControl = new FormControl("", [Validators.required]);
  phone: FormControl = new FormControl("",);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  message: FormControl = new FormControl("", [Validators.required]);
  honeypot: FormControl = new FormControl("");
  submitted: boolean = false;
  isLoading: boolean = false;
  responseMessage?: string;

  constructor(private title: Title, private formBuilder: FormBuilder, private http: HttpClient,) {
    this.title.setTitle('Kiskert-M | Zöldségdoboz');
    this.form = this.formBuilder.group({
      name: this.name,
      phone: this.phone,
      email: this.email,
      message: this.message,
      honeypot: this.honeypot
    });
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.form.status == "VALID" && this.honeypot.value == "") {
      this.form.disable();
      var formData: any = new FormData();
      formData.append("Név", this.form.get("name")?.value);
      formData.append("Email", this.form.get("email")?.value);
      formData.append("Telefonszám", this.form.get("phone")?.value);
      formData.append("Üzenet", this.form.get("message")?.value);
      this.isLoading = true;
      this.submitted = true;
      this.http.post("https://script.google.com/macros/s/AKfycbzTOLP029skyKiiqTotA9MOAHaCS9f2BKU7JD4TTDwT4vUvlSI6/exec", formData).subscribe(
        (response) => {
          alert("Köszönöm az üzenetet! Hamarosan felveszem veled a kapcsolatot.")
          this.form.enable();
          this.submitted = true;
          this.isLoading = false;
          // console.log(response);
        },
        (error) => {
          this.responseMessage = "Valami hiba történt! Kérlek töltsd újra az oldalt és próbáld újra.";
          this.form.enable();
          this.submitted = true;
          this.isLoading = false;
          console.log(error);
        }
      )
    }
  }

}
