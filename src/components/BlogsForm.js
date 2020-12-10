import React from 'react';
import PropTypes from 'prop-types';

BlogsForm.propTypes = {
	handleChange:PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

function BlogsForm({handleSubmit, handleChange, title, author, url}) {
	return (
		<form onSubmit={handleSubmit}>
			<label>Title: <input type='text' onChange={handleChange} value={title} name='title' /></label>
			<label>Author: <input type='text' onChange={handleChange} value={author} name='author' /></label>
			<label>URL: <input type='text' onChange={handleChange} value={url} name='url' /></label>
			<button type='submit'>Add new</button>
		</form>
	);
}

export default BlogsForm;