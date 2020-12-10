import React, { useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';



const Toggable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		};
	});

	return (
		<>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<br/>
				<button onClick={toggleVisibility}>Cancel</button>
			</div>
		</>
	);
});

Toggable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

Toggable.displayName = 'Toggable';

export default Toggable;