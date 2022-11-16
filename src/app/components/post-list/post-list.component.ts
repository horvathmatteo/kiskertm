import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/models/post.class';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts?: Post[];
  currentPost?: Post;
  currentIndex = -1;


  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.retrievePost();
  }

  refreshList(): void {
    this.currentPost = undefined;
    this.currentIndex = -1;
    this.retrievePost();
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
    });
  }

  setActivePost(post: Post, index: number): void {
    this.currentPost = post;
    this.currentIndex = index;
  }
}
