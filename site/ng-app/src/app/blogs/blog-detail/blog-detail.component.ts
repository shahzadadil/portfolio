import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentfulClientApi, createClient } from 'contentful';

@Component({
	selector: 'app-blog-detail',
	templateUrl: './blog-detail.component.html',
	styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

	private readonly _blogId: String;
	private _contentfulClient!: ContentfulClientApi;

	constructor(private _activatedRoute: ActivatedRoute) {
		this._blogId = _activatedRoute.snapshot.paramMap.get("id") || '';
		console.log(this._blogId); 
	 }

	ngOnInit(): void {
		this._contentfulClient = createClient({
			accessToken: '9REUGSLyTUOuiLjVmvHZ3Gu4_I1FvvVwZ6MtbPTzOaU',
			space: 'e8vcxiikow63'
		  });

		this._contentfulClient
			.getEntry('4GWUzYFvtEchMTLoxuF7rJ')
			.then((response: any) => {
				console.log(response);
			})
			.catch((err: Error) => console.log(err));
	}

}
