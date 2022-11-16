import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.class';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  posts: Post[];
  latestPost?: Post;
  today: any;
  yesterday = new Date(); 
  yesterdayString: any;
  isEmpty = true;

  constructor(private blogService: BlogService, private datePipe: DatePipe) {
    this.posts = [];
   }

  ngOnInit(): void {
    this.retrievePost();
    this.today = this.datePipe.transform(new Date(), 'MMMM dd.','+0200', 'hu');
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.yesterdayString = this.datePipe.transform(this.yesterday, 'MMMM dd.','+0200', 'hu');
    // console.log(this.yesterdayString)
  }

  retrievePost(): void {
    this.blogService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.posts = data;
      if(this.posts.length != 0) {
        this.isEmpty = false;
      }
      this.posts.sort((a,b) => (a.createdAt < b.createdAt) ? 1 : -1);
      this.latestPost = this.posts.shift();
    });
  }

}
