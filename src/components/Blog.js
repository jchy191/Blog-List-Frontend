import React from 'react';
import PropTypes from 'prop-types';

// Blog.propTypes = {
// 	blog: PropTypes.object.isRequired,
// };

const Blog = ({ blog }) => (
	<div>
		{blog.title} {blog.author}
	</div>
);

export default Blog;
