import React, { useState } from 'react';
import PropTypes from 'prop-types';

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	likeBlog: PropTypes.func.isRequired,
	deleteBlog: PropTypes.func.isRequired,
};

function Blog({ blog, likeBlog, deleteBlog }) {

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	};
	
	const [visible, setVisibility] = useState(false);
	const user = window.localStorage.getItem('loggedInUser');

	const handleLikes = () => {
		likeBlog(blog);
	};

	const handleDelete = () => {
		if (window.confirm(`Remove ${blog.title} by ${blog.author}?`))
			deleteBlog(blog);
	};
	return (
		<div style={blogStyle}>
			{visible === false &&
				<>
					<div>
						{blog.title} {blog.author}
						<button onClick={() => setVisibility(true)}>View</button>
					</div>
				</>
			}
			{visible === true &&
				<>
					<p>Title: {blog.title} <button onClick={() => setVisibility(false)}>Hide</button></p>
					<p>URL: {blog.url}</p>
					<p>Likes: {blog.likes}<button onClick={handleLikes}>Like</button></p>
					<p>Author: {blog.author}</p>
					{user.username === blog.user.username && <button onClick={handleDelete}>Remove</button>}
				</>
			}
		</div>

	);
}


export default Blog;
