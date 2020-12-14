module.exports = {
	'env': {
		'browser': true,
		'es6': true,
		'node': true,
		'jest/globals': true,
		'cypress/globals': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'plugins': [
		'react', 'jest', 'cypress'
	],
	'ignorePatterns': '/build',
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'eqeqeq': 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': [
		'error', 'always'
		],
		'arrow-spacing': [
				'error', { 'before': true, 'after': true }
		]
	}
};