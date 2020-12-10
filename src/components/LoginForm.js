import React from 'react';
import PropTypes from 'prop-types';

LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

function LoginForm({ username, password, handleChange, handleSubmit }) {
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