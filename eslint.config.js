import pluginJs from '@eslint/js';
import globals from 'globals';

export default [
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	{ ignores: ['node_modules/', 'dist/', 'build/', 'coverage/', 'lib/', 'public/'] },
	{
		rules: {
			'no-unused-vars': 'warn',
			semi: ['warn', 'always'],
			'no-var': 'warn',
			'prefer-const': 'warn',
			'no-debugger': 'warn',
			'no-alert': 'warn',
			'no-undef': 'warn',
			'no-use-before-define': 'warn',
			'no-unused-expressions': 'warn',
			'no-unused-labels': 'warn',
			'no-undef-init': 'warn',
			'no-undefined': 'warn',
			'no-extra-semi': 'error',
			'semi-spacing': 'error',
			'no-dupe-else-if': 'error',
			'no-duplicate-imports': 'error',
			'no-global-assign': 'error',
		},
	},
];
