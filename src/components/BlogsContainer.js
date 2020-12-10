import React from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';

BlogsContainer.propTypes = {
	blogs: PropTypes.array.isRequired,
	likeBlog: PropTypes.func.isRequired,
};

function BlogsContainer({ blogs, likeBlog }) {
	return (
		<>
			<h2>Blogs</h2>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} likeBlog={likeBlog}/>
			)}
		</>
	);
}

export default BlogsContainer;