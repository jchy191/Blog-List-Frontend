import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		);  
	}, []);

	useEffect(() => {
		const storedUser = window.localStorage.getItem('loggedInUser');
		if (storedUser !== null) {
			setUser(JSON.parse(storedUser));
		}
	}, []);
  
	const handleChange = (e) => {
		if (e.target.name === 'username') {
			setUsername(e.target.value);
		}
		if (e.target.name === 'password') {
			setPassword(e.target.value);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const user = await loginService.login({username, password});
			setUser(user);
			setUsername('');
			setPassword('');
			window.localStorage.setItem('loggedInUser', JSON.stringify(user));
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogOut = () => {
		setUser(null);
	};

	const blogsContainer = () => (
		<>
			<h2>blogs</h2>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</>
	);


	return (
		<div>
			{user === null ? 
				<LoginForm username={username} password={password} handleChange={handleChange} handleSubmit={handleSubmit}/>
				:
				<div>
					<p>{user.name} is logged-in</p><button onClick={handleLogOut}>Log out?</button>
				</div>	
			}

			{user && blogsContainer()}
		</div>
	);
};

export default App;