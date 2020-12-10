import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogsForm from './components/BlogsForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [newPost, setNewPost] = useState({
		title:'',
		author: '',
		url: ''
	});
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
		let value = e.target.value;
		if (e.target.name === 'username') {
			setUsername(e.target.value);
		}
		if (e.target.name === 'password') {
			setPassword(e.target.value);
		}
		if (e.target.name === 'title') {
			setNewPost({...newPost, title: value});		

		}
		if (e.target.name === 'author') {
			setNewPost({...newPost, author: value});		

		}
		if (e.target.name === 'url') {
			setNewPost({...newPost, url: value});		
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			blogService.setToken(user.token);
			const response = await blogService.create(newPost);
			setBlogs([...blogs, response]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogin = async (e) => {
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
		window.localStorage.removeItem('loggedInUser');
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
				<LoginForm username={username} password={password} handleChange={handleChange} handleSubmit={handleLogin}/>
				:
				<div>
					<p>{user.name} is logged-in</p><button onClick={handleLogOut}>Log out?</button>
					<BlogsForm author={newPost.author} title={newPost.title} url={newPost.url} handleChange={handleChange} handleSubmit={handleSubmit}/>
				</div>	
			}

			{user && blogsContainer()}
		</div>
	);
};

export default App;