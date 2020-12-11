import React from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';

BlogsContainer.propTypes = {
	blogs: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	likeBlog: PropTypes.func.isRequired,
	deleteBlog: PropTypes.func.isRequired,
};

function BlogsContainer({ blogs, user, likeBlog, deleteBlog }) {
	return (
		<>
			<h2>Blogs</h2>
			{blogs.map(blog =>
				<Blog key={blog.id} user={user} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog}/>
			)}
		</>
	);
}

export default BlogsContainer;