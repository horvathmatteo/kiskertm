import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { HtmlEditorService, ImageService, LinkService, QuickToolbarService, RichTextEditorComponent, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { Post } from 'src/app/models/post.class';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  providers: [HtmlEditorService, ToolbarService, LinkService, ImageService, QuickToolbarService]
})
export class PostDetailsComponent implements OnInit, OnChanges {

  @Input() post = new Post();
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentPost: Post = {
    title: '',
    image: '',
    description: '',
    createdAt: '',
    content: '',
    published: false
  };
  message = '';
  date?: string;

  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };
  public iframe: object = { enable: true };
  public height: number = 500;
  public fontFamily: Object = {
    items: [
      {text: "Segoe UI", value: "Segoe UI", class: "e-segoe-ui",  command: "Font", subCommand: "FontName"},
      {text: "Roboto", value: "Roboto",  command: "Font", subCommand: "FontName"},
      {text: "Montserrat", value: "Montserrat,sans-serif",  command: "Font", subCommand: "FontName"}, // here font is added
      {text: "Great vibes", value: "Great Vibes,cursive",  command: "Font", subCommand: "FontName"}, // here font is added
      {text: "Noto Sans", value: "Noto Sans",  command: "Font", subCommand: "FontName"},
      {text: "Impact", value: "Impact,Charcoal,sans-serif", class: "e-impact", command: "Font", subCommand: "FontName"},
      {text: "Tahoma", value: "Tahoma,Geneva,sans-serif", class: "e-tahoma", command: "Font", subCommand: "FontName"},
    ]
  };
  @ViewChild('content') content?: RichTextEditorComponent; 

  constructor(private blogService: BlogService) {
    this.date = this.post?.createdAt;
   }

  ngOnChanges(changes: SimpleChanges): void {
    this.message = '';
    this.currentPost = { ...this.post };
  }

  ngOnInit(): void {
  }

  updatePost(): void {
    const data = {
      title: this.currentPost.title,
      image: this.currentPost.image,
      description: this.currentPost.description,
      content: this.currentPost.content,
    };

    if (this.currentPost.id) {
      this.blogService.update(this.currentPost.id, data)
        .then(() => this.message = 'The post was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deletePost(): void {
    if (this.currentPost.id) {
      this.blogService.delete(this.currentPost.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The post was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}
