import React, { Component } from 'react';

class PhotoUpload extends Component {
	constructor(props) {
		super(props);
		this.handleFileUploadChanged = this.handleFileUploadChanged.bind(this);
		this.handleSelectFileClicked = this.handleSelectFileClicked.bind(this);
	}

	handleFileUploadChanged(e) {
		this.props.onChanged(e.target.files[0]);
	}

	handleSelectFileClicked(el) {
		el.click();
	}

	render() {
		const coverUrl = this.props.coverUrl;
		const cover = this.props.cover;

		return (
			<div class="photo-upload">
				<div class="preview">
					<img class="cover center-block" src={coverUrl} />
				</div>
				<div class="controls text-center">
					<input id="fileupload" class="fileupload" type="file" onChange={this.handleCoverChanged} />
					<button class="selectfile btn btn-default" type="button" ref={this.handleSelectFileClicked} />
					<p class="help-block">Cover changes are not permanent until book is added.</p>
				</div>
			</div>
		);
	}
}
