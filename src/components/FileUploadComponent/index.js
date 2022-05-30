'use strict';

import { EventEmitter } from 'events';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { Container, Grid, Paper } from '@material-ui/core';

class FileUploadComponent extends React.Component {
	constructor(props) {
		super(props);
		this.proxy = new EventEmitter();
		this.state = {
			progress: -1,
			hasError: false,
		};
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps.url !== this.props.url && this.state.progress < 0){
			this._doUpload()
		}
	}

	cancelUpload() {
		this.proxy.emit('abort');
		this.setState({
			progress: -1,
			hasError: false,
		});
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({
			progress: 0,
			hasError: false,
		}, this._doUpload);
	}

	render() {
		const formElement = this.props.formRenderer(this.onSubmit.bind(this));
		const progessElement = this.props.progressRenderer(
			this.state.progress, this.state.hasError, this.cancelUpload.bind(this));

		return (
			<div>
			{formElement}
			{progessElement}
			</div>
			);
	}

	_getFormData() {
		if (this.props.formGetter) {
			return this.props.formGetter();
		}
		return new FormData(ReactDom.findDOMNode(this.refs.form));
	}

	_doUpload() {
		const form = this._getFormData();
		// console.log(this.props.fileType)
		// return
		const req = new XMLHttpRequest();
		req.open('PUT', this.props.url, true);
		req.setRequestHeader('Content-Type', this.props.file.type);
		req.setRequestHeader("Content-Disposition", "attachment; filename=" + encodeURIComponent(this.props.file.name));

		req.addEventListener('load', (e) => {
			this.proxy.removeAllListeners(['abort']);
			const newState = { progress: 100 };
			if (req.status >= 200 && req.status <= 299) {
				this.setState(newState, () => {
					this.props.onComplete(e, req);
				});
			} else {
				newState.hasError = true;
				this.setState(newState, () => {
					this.props.onError(e, req);
				});
			}
		}, false);

		req.addEventListener('error', (e) => {
			this.setState({
				hasError: true,
			}, () => {
				this.props.onError(e, req);
			});
		}, false);

		req.upload.addEventListener('progress', (e) => {
			let progress = 0;
			if (e.total !== 0) {
				progress = parseInt((e.loaded / e.total) * 100, 10);
			}
			this.setState({
				progress,
			}, () => {
				this.props.onProgress(e, req, progress);
			});
		}, false);

		req.addEventListener('abort', (e) => {
			this.setState({
				progress: -1,
			}, () => {
				this.props.onAbort(e, req);
			});
		}, false);

		this.proxy.once('abort', () => {
			req.abort();
		});

		this.props.beforeSend(req)
		.send(this.props.file);
	}
}

FileUploadComponent.propTypes = {
	url: PropTypes.string.isRequired,
	method: PropTypes.string.isRequired,
	formGetter: PropTypes.func,
	formRenderer: PropTypes.func,
	progressRenderer: PropTypes.func,
	beforeSend: PropTypes.func,
	onProgress: PropTypes.func,
	onLoad: PropTypes.func,
	onError: PropTypes.func,
	onAbort: PropTypes.func,
};

FileUploadComponent.defaultProps = {
	formRenderer: (onSubmit) => { return null },
	progressRenderer: (progress, hasError, cancelHandler) => { return null },
	beforeSend: (request) => request,
	onProgress: (e, request, progress) => {},
	onComplete: (e, request) => {},
	onError: (e, request) => {},
	onAbort: (e, request) => {}
};

export default FileUploadComponent
