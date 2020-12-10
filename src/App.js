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
	const [user, setUser] = useState(null);

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
  


	const addBlog = async (newPost) => {
		try {
			blogService.setToken(user.token);
			const response = await blogService.create(newPost);
			setBlogs([...blogs, response]);
			setMessage(`New blog: ${newPost.title} by ${newPost.author} added!`);
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

	const handleLogin = async (credentials) => {
		try {
			const user = await loginService.login(credentials);
			setUser(user);
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
					<LoginForm login={handleLogin}/>
				</>
				:
				<>
					<Notification message={message} isError={isError} />
					<p>{user.name} is logged-in <button onClick={handleLogOut}>Log out?</button></p>
					<Toggable buttonLabel='Add blog' ref={blogFormRef}>
						<BlogsForm addBlog={addBlog}/>
					</Toggable>
					<BlogsContainer blogs={blogs}/>
				</>	
			}
		</div>
	);
};

export default App;