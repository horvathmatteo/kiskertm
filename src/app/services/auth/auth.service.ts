import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: Observable<any>;
  currentuser: any = null;

  constructor(private auth: AngularFireAuth) { 
    this.authState = this.auth.authState;

    this.authState.subscribe(user => {
      if(user) {
        this.currentuser = user;
      } else {
        this.currentuser = null;
      }
    })
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }
}
