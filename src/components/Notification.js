import React from 'react';
import PropTypes from 'prop-types';

Notification.propTypes = {
	message: PropTypes.string,
	isError: PropTypes.bool.isRequired,
};

function Notification({ message, isError }) {
	if (message === null) {
		return null;
	}

	let messageType = 'notification';

	if (isError) {
		messageType = 'error';
	}

	return (
		<div className={`${messageType}`}>
			{message}
		</div>
	);
}

export default Notification;