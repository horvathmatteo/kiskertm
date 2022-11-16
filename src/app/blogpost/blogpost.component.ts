import { Component, OnInit, Pipe, PipeTransform, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Post } from '../models/post.class';
import { BlogService } from '../services/blog.service';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: any) {
    // console.log(this.sanitized.bypassSecurityTrustHtml(value))
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogpostComponent implements OnInit {
  id?: string | null;
  currentPost?: Post;

  constructor(private activatedRoute: ActivatedRoute, private blogService: BlogService) {
   }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.retrieveSelectedPost();
  }

  retrieveSelectedPost(): void {
    this.blogService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      data.forEach(element => {
        if(element.id === this.id) {
          this.currentPost = element;
        }
      });
    });
  }

}
