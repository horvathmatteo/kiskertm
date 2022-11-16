import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';
import { DatePipe } from '@angular/common';
import { KamraService } from '../services/kamra.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  items: any[] = [];
  profileForm = new FormGroup({
    vezetek: new FormControl('', Validators.required),
    kereszt: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    note: new FormControl(),
    confirm: new FormControl('', Validators.required)
  });
  destinations: Map<number, number> = new Map([
    [1, 0],
    [2, 500],
    [3, 800],
  ]);
  selectedOption = 0;
  couponInput = "";
  valid = false;
  discount = 0;
  minus = 0;
  subtotal = 0;
  originalTotal = 0;
  shipping = 0;
  shippingCost: number = 0;
  step = 1;
  error = false;
  message = "";
  title="";
  type="";
  couponCode="VISSZATERTEM7";
  isEverythingOK = true;

  constructor(private cartService: CartService, private func: AngularFireFunctions, private datepipe: DatePipe, private kamraService: KamraService) {
  }

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('products')!);
    this.items.forEach(el => 
      this.subtotal = this.subtotal + el!.total!);
    this.originalTotal = this.subtotal;
  }

  emptyCart(id: any) {
    this.items = this.items.filter(item => item.id !== id);
    sessionStorage.setItem('products', JSON.stringify(this.items));
    var counter = parseInt(sessionStorage.getItem('counter')!);
    if ((counter-1) <= 0) {
      sessionStorage.setItem('counter', JSON.stringify(0));
      this.cartService.sendNumber(0);
    }else {
      sessionStorage.setItem('counter', JSON.stringify(counter - 1));
      this.cartService.sendNumber(counter - 1);
    }
 
    this.changeSubTotal();
  }

  onChange(id: any) {
    var item = this.items.find(el => el.id === id);
    item!.total = item!.price! * item!.quantity!;
    this.changeSubTotal();
    var index = this.items.indexOf(item);
    this.items[index] = item;
    sessionStorage.setItem('products', JSON.stringify(this.items));
  }

  showSpinner(option: number){
    var overlay = document.getElementById("overlay");
    if(option == 1) {
      overlay!.style.display = "block";
    }
    if(option == 0) {
      overlay!.style.display = "none";
    }
  }

  changeSubTotal() {
    this.subtotal = 0;
    this.items.forEach(el => 
      this.subtotal = this.subtotal + el!.total!);
    this.originalTotal = this.subtotal;
    if(this.discount != 0) {
      this.refreshDiscount(this.discount);
    }
    if(this.shipping == 1 || this.shipping == 2 || this.shipping == 3) {
      this.shippingCost = this.destinations.get(1)!;
      this.subtotal = this.subtotal;
    }
    if(this.shipping == 4) {
      this.shippingCost = this.destinations.get(2)!;
      this.subtotal = this.subtotal + this.shippingCost;
    }
    if(this.shipping == 5 || this.shipping == 6) {
      this.shippingCost = this.destinations.get(3)!;
      this.subtotal = this.subtotal + this.shippingCost;
    }
    if(this.shipping == 7) {
      this.shippingCost = this.destinations.get(1)!;
      this.subtotal = this.subtotal + this.shippingCost;
    }
  }

  checkCode() {
    if(this.couponInput.toLowerCase() == "megtalaltam5" || this.couponInput.toLowerCase() === "feliratkoztam5" || this.couponInput.toLowerCase() === "oktober5") {
      this.discount = 5;
      this.refreshDiscount(5);
      this.valid = true;
      this.showPopUp("Siker!","Sikeresen felhasználtad a kuponkódot!","success");
    }else if(this.couponInput.toLowerCase() === "visszatertem7"){
      this.discount = 7;
      this.refreshDiscount(7);
      this.valid = true;
      this.showPopUp("Siker!","Sikeresen felhasználtad a kuponkódot!","success");
    }else {
      this.showPopUp("Rossz kuponkód","Sajnos nincs ilyen kuponkód.", "error");
    }
  }

  refreshDiscount(disc: number) {
    this.minus = Math.round(this.originalTotal * (disc / 100));
    this.subtotal = this.subtotal - this.minus;
  }

  next() {
    if(this.step < 3) {
      this.step++;
    }
  }

  back() {
    if(this.step >= 2) {
      this.step--;
    }
  }

  showPopUp(title: string, message: string, type: string) {
    this.error = true;
    this.message = message;
    this.title = title;
    this.type = type;
  }

  sendOrder() {
    this.profileForm.markAllAsTouched();
    console.log(this.profileForm.value);
    console.log("Form status: " + this.profileForm.controls.vezetek.value)
  }

  checkData() {
    this.items.forEach(el => {
      if(el!.quantity! <= 0) {
        this.showPopUp("Érvénytelen mennyiség", "Valamelyik termék mennyisége nem megfelő.", "error");
        this.isEverythingOK = false;
      }
    });

    if(this.shipping <= 0 || this.shipping > 4) {
      this.showPopUp("Szállítási mód kiválasztása", "Nem választottál szállítási módot", "error");
      this.isEverythingOK = false;
    }
    if(this.shipping == 4 || this.shipping == 5 || this.shipping == 6 || this.shipping == 7) {
      this.profileForm.markAllAsTouched();
      if(this.profileForm.status == "INVALID") {
        this.showPopUp("Hibás kitöltés", "Kérlek ellenőrizd, hogy mindent helyesen töltöttél-e ki", "error");
        this.isEverythingOK = false;
      }
    }else {
      this.profileForm.get("zip")?.clearValidators();
      this.profileForm.get("zip")?.updateValueAndValidity();
      this.profileForm.get("city")?.clearValidators();
      this.profileForm.get("city")?.updateValueAndValidity();
      this.profileForm.get("address")?.clearValidators();
      this.profileForm.get("address")?.updateValueAndValidity();
      this.profileForm.markAllAsTouched();
      if(this.shipping == 1) {
        this.profileForm.controls['zip'].setValue("Személyes átvétel Hódmezővásárhelyen");
      }
      if(this.shipping == 2) {
        this.profileForm.controls['zip'].setValue("Személyes átvétel Szegeden");
      }
      if(this.shipping == 3) {
        this.profileForm.controls['zip'].setValue("Személyes átvétel Szentesen");
      }
      if(this.profileForm.status == "INVALID") {
        this.showPopUp("Hibás kitöltés", "Kérlek ellenőrizd, hogy mindent helyesen töltöttél-e ki", "error");
        this.isEverythingOK = false;
      }
    }

  }

  sendEmail() {
    this.checkData();
    if(this.isEverythingOK) {
      this.showSpinner(1);
      const callable = this.func.httpsCallable('genericEmail');
      const retVal = callable({
        subject: 'Megrendelés',
        vezetek: this.profileForm.controls.vezetek.value,
        kereszt: this.profileForm.controls.kereszt.value,
        email: this.profileForm.controls.email.value,
        phone: this.profileForm.controls.phone.value,
        zip: this.profileForm.controls.zip.value,
        city: this.profileForm.controls.city.value,
        address: this.profileForm.controls.address.value,
        date: this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm'),
        items: this.items,
        originalTotal: this.originalTotal,
        discount: this.discount,
        minus: this.minus,
        shippingCost: this.shippingCost,
        subtotal: this.subtotal,
        couponCode: this.couponCode,
        note: this.profileForm.controls.note.value
      }).subscribe(data => {
        if(data.success) {
          this.showSpinner(0);
          this.showPopUp("Sikeres rendelés", "Rendelésedet sikeresen megkaptam, hamarosan felveszem veled a kapcsolatot", "success");
          this.cartService.clearCart();
          this.kamraService.decreaseStock(this.items);
        }else {
          this.showPopUp("Sikertelen megrendelés", "Valami hiba lépett fel a megrendelés elküldése során", "error");
        }
      });
    }
    this.isEverythingOK = true;
    this.profileForm.get("zip")?.setValidators([Validators.required]);
      this.profileForm.get("zip")?.updateValueAndValidity();
      this.profileForm.get("city")?.setValidators([Validators.required]);
      this.profileForm.get("city")?.updateValueAndValidity();
      this.profileForm.get("address")?.setValidators([Validators.required]);
      this.profileForm.get("address")?.updateValueAndValidity();
  }
}
