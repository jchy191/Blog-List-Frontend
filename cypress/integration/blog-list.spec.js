/// <reference types="Cypress" />
describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		const user = {
			name: 'Joshua',
			username: 'Jobi',
			password: 'asdfghjkl',
		};
		cy.request('POST', 'http://localhost:3003/api/users', user);
		cy.visit('http://localhost:3000');
	});

	it('front page can be opened', function() {
		cy.contains('Blog-list Application');
	});

	it('login form is shown', function() {
		cy.contains('Username');
		cy.contains('Password');
		cy.get('button').contains('Submit');
	});

	describe('Login', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('Jobi');
			cy.get('#password').type('asdfghjkl');
			cy.get('#login-button').click();

			cy.get('html').should('contain', 'Joshua is logged-in');
			cy.get('.notification').should('contain', 'Logged in successfully!');
			cy.get('html').should('not.contain', 'There was an error logging in');

		});

		it('fails with wrong credentials', function() {
			cy.get('#username').type('Mo');
			cy.get('#password').type('lkjhgfdsa');
			cy.get('#login-button').click();

			cy.get('html').should('not.contain', 'Joshua is logged in');
			cy.get('html').should('not.contain', 'Logged in successfully!');
			cy.get('.error').as('error-notif');
			cy.get('@error-notif').should('contain', 'There was an error logging in');
			cy.get('@error-notif').should('have.css', 'color', 'rgb(255, 0, 0)');

		});

	});

	describe('A logged in user', function() {
		beforeEach(function() {
			cy.login({ username: 'Jobi', password: 'asdfghjkl' });
		});

		it('can create a blog', function() {
			cy.contains('Add blog').click();
			cy.get('#title-field').type('Hello');
			cy.get('#author-field').type('Ali');
			cy.get('#url-field').type('www.hello.com');
			cy.contains('Add new').click();

			cy.get('.blog-container').should('contain', 'Hello');
			cy.get('.blog-container').should('contain', 'Ali');
			cy.get('.blog-container').should('contain', 'View');
			cy.get('.blog-container').should('not.contain', 'www.hello.com');
			cy.get('.blog-container').should('not.contain', 'likes');
		});

	});

	describe.only('A created blog', function() {
		beforeEach(function() {
			cy.login({ username: 'Jobi', password: 'asdfghjkl' });

			cy.newBlog({
				title: 'Hello',
				author: 'Ali',
				url: 'www.hello.com'
			});

			cy.newBlog({
				title: 'Javascript',
				author: 'Jay Son',
				url: 'www.js.com'
			});

			cy.newBlog({
				title: 'React',
				author: 'Vue',
				url: 'www.angular.com'
			});
		});

		it('can be liked', function() {
			cy.contains('Hello').parent().as('blog');
			cy.get('@blog').contains('View').click();
			cy.get('@blog').should('contain', 'Likes: 0');
			cy.get('@blog').contains('Like').click();
			cy.get('@blog').should('contain', 'Likes: 1');
		});

		it('can be deleted by the user who created it', function() {
			cy.contains('Hello').parent().as('blog');
			cy.get('@blog').contains('View').click();
			cy.get('@blog').contains('Remove').click();

			cy.get('.notification').should('contain', 'Hello by Ali deleted!');
		});

		it('cannot be deleted by another user', function() {
			cy.contains('Log out?').click();
			const user = {
				name: 'Joshua',
				username: 'Mo',
				password: 'lkjhgfdsa',
			};
			cy.request('POST', 'http://localhost:3003/api/users', user);
			cy.login({ username: 'Mo', password: 'lkjhgfdsa' });

			cy.contains('Hello').parent().as('blog');
			cy.get('@blog').contains('View').click();
			cy.get('@blog').should('not.contain', 'Remove');
		});

	});

});