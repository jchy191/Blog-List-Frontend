import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogsForm from '../components/BlogsForm';

describe('<BlogsForm />', () => {
	it('updates parent state and calls onSubmit', () => {
		const addBlog = jest.fn();
		const component = render(
			<BlogsForm addBlog={addBlog}/>
		);
		
		const author = component.container.querySelector('#author-field');
		const title = component.container.querySelector('#title-field');
		const url = component.container.querySelector('#url-field');
		const form = component.container.querySelector('form');
		fireEvent.change(author, {
			target: { value: 'John' }
		});
		fireEvent.change(title, {
			target: { value: 'Hello!' }
		});
		fireEvent.change(url, {
			target: { value: 'www.testing123.com' }
		});

		fireEvent.submit(form);

		expect(addBlog.mock.calls).toHaveLength(1);
		expect(addBlog.mock.calls).toHaveLength(0);
	});
});