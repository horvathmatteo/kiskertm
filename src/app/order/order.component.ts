import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  form: FormGroup;
  name: FormControl = new FormControl("", [Validators.required]);
  phone: FormControl = new FormControl("",);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  message: FormControl = new FormControl("", [Validators.required]);
  honeypot: FormControl = new FormControl("");
  submitted: boolean = false;
  isLoading: boolean = false;
  responseMessage?: string;
  
  constructor(private title: Title, private http: HttpClient, private formBuilder: FormBuilder) {
    this.title.setTitle('Kiskert-M | Palántarendelés');
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