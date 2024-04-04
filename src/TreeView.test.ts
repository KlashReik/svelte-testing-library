import { fireEvent, render, screen } from '@testing-library/svelte';
import { test, expect } from 'vitest';
import TreeView from './TreeView.svelte';

const TREE_MOCK = {
	label: 'USA',
	children: [
		{
			label: 'Florida',
			children: [
				{ label: 'Jacksonville' },
				{
					label: 'Orlando',
					children: [
						{ label: 'Disney World' },
						{ label: 'Universal Studio' },
						{ label: 'Sea World' }
					]
				},
				{ label: 'Miami' }
			]
		},
		{
			label: 'California',
			children: [{ label: 'San Francisco' }, { label: 'Los Angeles' }, { label: 'Sacramento' }]
		}
	]
};

test('Folder Tree correctly opens nested folders', async () => {
	render(TreeView, { tree: TREE_MOCK });
	const rootItem = screen.getByText('USA');

	expect(rootItem).toBeInTheDocument();

	await fireEvent.click(rootItem);
	const firstLevelFolder = screen.getByText('Florida');
	expect(firstLevelFolder).toBeInTheDocument();
});
// TODO: this logic should change

test('Folder Tree correctly renders empty folders', async () => {
	render(TreeView, { tree: TREE_MOCK });
	const rootItem = screen.getByText('USA');

	expect(rootItem).toBeInTheDocument();

	await fireEvent.click(rootItem);
	// With this line uncommented - everything works
	// await fireEvent.click(rootItem);

	const firstLevelFolder = screen.getByText('Florida');
	expect(firstLevelFolder).toBeInTheDocument();
});
