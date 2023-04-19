import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ContentfulClientApi, createClient, Entry, EntryCollection } from 'contentful';
import { BlogDetail } from './blog-detail';

@Component({
	selector: 'app-blog-detail',
	templateUrl: './blog-detail.component.html',
	styleUrls: ['./blog-detail.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class BlogDetailComponent implements OnInit {

	private readonly _blogTitle: String;
	private _contentfulClient: ContentfulClientApi;

	public blogDetail!: BlogDetail;

	constructor(
		private _activatedRoute: ActivatedRoute, 
		private _titleService: Title,
		private meta: Meta) {

		this._contentfulClient = createClient({
			accessToken: '9REUGSLyTUOuiLjVmvHZ3Gu4_I1FvvVwZ6MtbPTzOaU',
			space: 'e8vcxiikow63'
		});

		this._blogTitle = this._activatedRoute.snapshot.paramMap.get("id") || '';
		this._titleService.setTitle(this._blogTitle.toString());

		this.meta.addTag({
			name: "og:title",
			content: this._blogTitle.toString()
		});
	}

	ngOnInit(): void {	

		this._contentfulClient
			.getEntries({
				content_type: "blog",
				'fields.title': this._blogTitle
			})
			.then((entries: EntryCollection<any>) => {

				if (entries.total === 0) {
					return;
				}

				this.blogDetail = new BlogDetail(entries.items[0]);
				this.meta.addTag({
					name: "og:image",
					content: this.blogDetail.coverImage.url.toString()
				});
				console.log(entries);
			})
			.catch((err: Error) => console.log(err));
	}

}
