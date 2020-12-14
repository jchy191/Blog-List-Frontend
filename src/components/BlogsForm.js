import React, { useState } from 'react';
import PropTypes from 'prop-types';

BlogsForm.propTypes = {
	addBlog: PropTypes.func.isRequired,
};

function BlogsForm({ addBlog }) {

	const [newPost, setNewPost] = useState({
		title:'',
		author: '',
		url: ''
	});

	const handleChange = (e) => {
		let value = e.target.value;
		if (e.target.name === 'title') {
			setNewPost({ ...newPost, title: value });

		}
		if (e.target.name === 'author') {
			setNewPost({ ...newPost, author: value });

		}
		if (e.target.name === 'url') {
			setNewPost({ ...newPost, url: value });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addBlog(newPost);
	};

	return (
		<>
			<h2>Add a blog entry:</h2>
			<form onSubmit={handleSubmit}>
				<label>Title: <input id='title-field' type='text' onChange={handleChange} value={newPost.title} name='title' /></label>
				<label>Author: <input id='author-field' type='text' onChange={handleChange} value={newPost.author} name='author' /></label>
				<label>URL: <input id='url-field' type='text' onChange={handleChange} value={newPost.url} name='url' /></label>
				<br/>
				<br/>
				<button type='submit'>Add new</button>
			</form>
		</>
	);
}

export default BlogsForm;