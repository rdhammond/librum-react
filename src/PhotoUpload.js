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
		const thumbnailUrl = this.props.thumbnailUrl;
		const cover = this.props.cover;

		return (
			<div className="photo-upload">
				<div className="preview">
					<img className="cover center-block" src={thumbnailUrl} />
				</div>
				<div className="controls text-center">
					<input id="cover" className="cover" type="file" onChange={this.handleCoverChanged} />
					<button className="selectfile btn btn-default" type="button" ref={this.handleSelectFileClicked} />
					<p className="help-block">Cover changes are not permanent until book is added.</p>
				</div>
			</div>
		);
	}
}

export default PhotoUpload;
