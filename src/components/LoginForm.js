import React, { useState } from 'react';
import PropTypes from 'prop-types';

LoginForm.propTypes = {
	login: PropTypes.func.isRequired,
};

function LoginForm({ login }) {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleChange = (e) => {
		let value = e.target.value;
		if (e.target.name === 'username') {
			setUsername(value);
		}
		if (e.target.name === 'password') {
			setPassword(value);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		login({username, password});
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>Username: <input onChange={handleChange} value={username} name='username' type='text'/></label>
			<br/>
			<label>Password: <input onChange={handleChange} value={password} name='password' type='password'/></label>
			<br/>
			<br/>
			<button type='submit'>Submit</button>
		</form>
	);
}

export default LoginForm;