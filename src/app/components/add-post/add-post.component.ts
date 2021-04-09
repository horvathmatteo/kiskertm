import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HtmlEditorService, ImageService, LinkService, QuickToolbarService, RichTextEditorComponent, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { Post } from 'src/app/models/post.class';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  providers: [HtmlEditorService, ToolbarService, LinkService, ImageService, QuickToolbarService]
})
export class AddPostComponent implements OnInit {

  post: Post = new Post();
  today: any;
  currentDate: any;

  submitted = false;

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
  public value: any = null;

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

  constructor(private blogService: BlogService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.today = this.datePipe.transform(new Date(), 'MMMM dd.','+0200', 'hu');
    console.log(this.today);
    this.post.createdAt = this.today;
  }

  savePost(): void {
    this.blogService.create(this.post).then(() => {
      console.log('Created successfully');
      this.submitted = true;
    });
  }

  newPost(): void {
    this.submitted = false;
    this.post = new Post();
  }

}
