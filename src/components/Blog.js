import React, { useState } from 'react';
import PropTypes from 'prop-types';

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	likeBlog: PropTypes.func.isRequired,
};

function Blog({ blog, likeBlog }) {

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	};
	
	const [visible, setVisibility] = useState(false);

	const handleLikes = () => {
		likeBlog(blog);
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
					<p>{blog.title} <button onClick={() => setVisibility(false)}>Hide</button></p>
					<p>{blog.url}</p>
					<p>{blog.likes}<button onClick={handleLikes}>Like</button></p>
					<p>{blog.author}</p>
				</>
			}
		</div>

	);
}


export default Blog;
