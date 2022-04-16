import { Asset } from "contentful";

export class ImageAsset {
	public title: String;
	public url: String;
	public contentType: String;

	constructor(imageAsset: Asset) {
		const fields = imageAsset.fields;
		this.title = fields.title;
		this.url = fields.file.url;
		this.contentType = fields.file.contentType;
	}
}