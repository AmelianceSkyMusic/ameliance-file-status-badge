module.exports = {
	tabWidth: 3,
	singleQuote: true,
	trailingComma: 'all',
	printWidth: 120,
	semi: true,
	overrides: [
		{
			files: ['**/*.json', '**/*.md'],
			options: {
				singleQuote: false,
			},
		},
	],
};
