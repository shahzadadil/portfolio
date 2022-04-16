import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { Asset } from "contentful";
import { ImageAsset } from "../image-asset";

export class BlogDetail {

	private id: String;
	public coverImage!: ImageAsset;
	public title: String;
	public subtitle: String;
	public publishedOn: Date;
	public minutesToRead: Number;
	public author: String;
	public htmlBody!: String;

	constructor(blogDetail: any) {
		const fields = blogDetail.fields;

		this.id = blogDetail.sys.id;
		this.title = fields.title;
		this.subtitle = fields.subtitle;
		this.publishedOn = fields.publishedOn;
		this.minutesToRead = fields.minutesToRead;
		this.author = fields.author;

		const coverImageDetails = <Asset>fields.coverImage;

		if (coverImageDetails != null) {
			this.coverImage = new ImageAsset(coverImageDetails);
		}		

		const richTextBody = fields.body;

		if (richTextBody != null) {
			this.htmlBody = documentToHtmlString(richTextBody);
		}
		
	}
}