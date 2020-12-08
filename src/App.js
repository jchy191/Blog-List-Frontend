import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		);  
	}, []);
  
	const handleChange = (e) => {
		if (e.target.name === 'username') {
			setUsername(e.target.value);
		}
		if (e.target.name === 'password') {
			setPassword(e.target.value);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div>
			<LoginForm username={username} password={password} handleChange={handleChange} handleSubmit={handleSubmit}/>
			<h2>blogs</h2>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
	);
};

export default App;