import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  mailChimpEndpoint = 'https://gmail.us7.list-manage.com/subscribe/post-json?u=b584f9942ba804448f38a21c7&amp;id=7dbcb1e30c';

  constructor(private http: HttpClient) { }

  subscribeTo(data: any) {
    const params = new HttpParams()
    .set('EMAIL', data.email)
    .set('b584f9942ba804448f38a21c7&amp;id=7dbcb1e30c', '');

    const mailChimpUrl = `${this.mailChimpEndpoint}&${params.toString()}`;
    return this.http.jsonp(mailChimpUrl, 'c')
  }


}


