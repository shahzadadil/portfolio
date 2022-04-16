import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentfulClientApi, createClient, Entry, EntryCollection } from 'contentful';
import { BlogDetail } from './blog-detail';

@Component({
	selector: 'app-blog-detail',
	templateUrl: './blog-detail.component.html',
	styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

	private readonly _blogTitle: String;
	private _contentfulClient: ContentfulClientApi;

	public blogDetail!: BlogDetail;

	constructor(private _activatedRoute: ActivatedRoute) {
		this._contentfulClient = createClient({
			accessToken: '9REUGSLyTUOuiLjVmvHZ3Gu4_I1FvvVwZ6MtbPTzOaU',
			space: 'e8vcxiikow63'
		});

		this._blogTitle = this._activatedRoute.snapshot.paramMap.get("id") || '';
		console.log(this._blogTitle);
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
				console.log(entries);
			})
			.catch((err: Error) => console.log(err));
	}

}
