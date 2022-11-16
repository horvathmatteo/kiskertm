import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Post } from '../models/post.class';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private dbPath = '/posts'

  postRef: AngularFirestoreCollection<Post>;

  constructor(private db: AngularFirestore) {
    this.postRef = db.collection(this.dbPath);
   }

  getAll(): AngularFirestoreCollection<Post> {
    return this.postRef;
  }

  create(post: Post): any {
    return this.postRef.add({...post});
  }

  update(id: string, data: any) {
    return this.postRef.doc(id).update(data);
  }

  delete(id: string) {
    return this.postRef.doc(id).delete();
  }
}
