import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentfulClientApi, createClient, EntryCollection } from 'contentful';
import { BlogDetail } from '../blog-detail/blog-detail';

@Component({
	selector: 'app-blog-list',
	templateUrl: './blog-list.component.html',
	styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

	private _contentfulClient: ContentfulClientApi;

	public blogs: BlogDetail[] = []; 

	constructor(private _router: Router) { 
		this._contentfulClient = createClient({
			accessToken: '9REUGSLyTUOuiLjVmvHZ3Gu4_I1FvvVwZ6MtbPTzOaU',
			space: 'e8vcxiikow63'
		});
	}

	ngOnInit(): void {
		this._contentfulClient
			.getEntries({
				content_type: "blog",
				select: "fields.title,fields.minutesToRead,fields.author,fields.publishedOn,fields.coverImage"
			})
			.then((entries: EntryCollection<any>) => {
				this.blogs = entries.items.map((entry) => new BlogDetail(entry));
			})
			.catch((err: Error) => console.log(err));
	}

	onSelectBlog(blogDetail: BlogDetail){
		this._router.navigate(["/blogs", blogDetail.title]);
	}

}
