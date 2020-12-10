import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import BlogsContainer from './components/BlogsContainer';
import BlogsForm from './components/BlogsForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [newPost, setNewPost] = useState({
		title:'',
		author: '',
		url: ''
	});
	const [ message, setMessage ] = useState(null);
	const [ isError, setIsError ] = useState(false);
	const blogFormRef = useRef();

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
			setUsername(value);
		}
		if (e.target.name === 'password') {
			setPassword(value);
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

	const addBlog = async (e) => {
		e.preventDefault();
		try {
			blogService.setToken(user.token);
			const response = await blogService.create(newPost);
			setBlogs([...blogs, response]);
			setMessage(`New Blog ${newPost.title} by ${newPost.author} added!`);
			setNewPost({title:'', author:'', url:''});
			setTimeout(() => {
				setMessage(null);
			}, 5000);
			blogFormRef.current.toggleVisibility();
		} catch (error) {
			console.log(error);
			setIsError(true);
			setMessage('There was an error adding the blog');
			setTimeout(() => {
				setMessage(null);
				setIsError(false);
			}, 5000);
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
			setMessage('Logged in successfully!');
			setTimeout(() => {
				setMessage(null);
				setIsError(false);
			}, 5000);		
		} catch (error) {
			console.log(error);
			setIsError(true);
			setMessage('There was an error logging in');
			setTimeout(() => {
				setMessage(null);
				setIsError(false);
			}, 5000);
		}
	};

	const handleLogOut = () => {
		setUser(null);
		window.localStorage.removeItem('loggedInUser');
	};

	return (
		<div>
			<h1>Blog-list Application</h1>
			{user === null ? 
				<>
					<h2>Login</h2>
					<Notification message={message} isError={isError} />
					<LoginForm username={username} password={password} handleChange={handleChange} handleSubmit={handleLogin}/>
				</>
				:
				<>
					<Notification message={message} isError={isError} />
					<p>{user.name} is logged-in <button onClick={handleLogOut}>Log out?</button></p>
					<Toggable buttonLabel='Add blog' ref={blogFormRef}>
						<BlogsForm author={newPost.author} title={newPost.title} url={newPost.url} handleChange={handleChange} handleSubmit={addBlog}/>
					</Toggable>
					<BlogsContainer blogs={blogs}/>
				</>	
			}
		</div>
	);
};

export default App;