import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import Blog from '../components/Blog';

describe('Blog', () => {
	let component;
	let likeHandler = jest.fn();

	beforeEach(() => {
		const blog = {
			author: 'Mark',
			url: 'www.test.com',
			title: 'Testing JS',
			likes: 90,
			user: {username: 'Marky'}
		};
		const user = {
			username: 'Marky'
		};
		component = render(
			<Blog blog={blog} user={user} likeBlog={likeHandler}/>
		);
	});

	it('renders title and author but not url and likes by default', () => {
		expect(component.container).toHaveTextContent('Mark');
		expect(component.container).toHaveTextContent('Testing JS');
		expect(component.container).not.toHaveTextContent('www.test.com');
		expect(component.container).not.toHaveTextContent('90');
	});

	it('renders url and likes as well after clicking on button', () => {
		const button = component.container.querySelector('#view-button');
		fireEvent.click(button);

		expect(component.container).toHaveTextContent('Mark');
		expect(component.container).toHaveTextContent('Testing JS');
		expect(component.container).toHaveTextContent('www.test.com');
		expect(component.container).toHaveTextContent('90');
	});

	it('calls event handler twice when like button clicked twice', () => {
		const button = component.container.querySelector('#view-button');
		fireEvent.click(button);

		const likeButton = component.container.querySelector('#like-button');
		fireEvent.click(likeButton);
		fireEvent.click(likeButton);
		expect(likeHandler.mock.calls).toHaveLength(2);
	});
});