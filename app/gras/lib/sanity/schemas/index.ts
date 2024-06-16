import { type SchemaTypeDefinition } from 'sanity';

import author from './author';
import blockContent from './blockContent';
import category from './category';
import newsletter from './newsletter';
import post from './post';
import section from './section';
import settings from './settings';

export const schemaTypes = [
	post,
	blockContent,
	newsletter,
	section,
	category,
	author,
	settings,
];
export const schema: { types: SchemaTypeDefinition[] } = {
	types: schemaTypes,
};
