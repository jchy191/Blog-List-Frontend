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
		const getBlogs = async () => {
			const blogs = await blogService.getAll();
			setBlogs(blogs.sort((a, b) => {
				if (a.likes < b.likes) return 1;
				if (a.likes > b.likes) return -1;
				return 0;
			}));
		};
		getBlogs();
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

	const likeBlog = async (postToUpdate) => {
		try {
			blogService.setToken(user.token);
			postToUpdate = {...postToUpdate, likes: postToUpdate.likes + 1};
			const response = await blogService.update(postToUpdate);
			setBlogs(blogs.map(blog => blog.id !== postToUpdate.id ? blog : response)
				.sort((a, b) => {
					if (a.likes < b.likes) return 1;
					if (a.likes > b.likes) return -1;
					return 0;
				}));
			setMessage(`${postToUpdate.title} by ${postToUpdate.author} liked!`);
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		} catch (error) {
			console.log(error);
			setIsError(true);
			setMessage('There was an error liking the post');
			setTimeout(() => {
				setMessage(null);
				setIsError(false);
			}, 5000);
		}
	};

	const deleteBlog = async (postToDelete) => {
		try {
			blogService.setToken(user.token);
			await blogService.remove(postToDelete);
			setBlogs(blogs.filter(blog => blog.id !== postToDelete.id));
			setMessage(`${postToDelete.title} by ${postToDelete.author} deleted!`);
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		} catch (error) {
			console.log(error);
			setIsError(true);
			setMessage('There was an error deleting the post');
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
					<BlogsContainer blogs={blogs} user={user} likeBlog={likeBlog} deleteBlog={deleteBlog}/>
				</>	
			}
		</div>
	);
};

export default App;