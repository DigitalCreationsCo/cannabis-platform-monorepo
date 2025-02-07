import { type SchemaTypeDefinition } from 'sanity';

import author from './author';
import blockContent from './blockContent';
import category from './category';
import newsletter from './newsletter';
import post from './post';
import section from './section';
import settings from './settings';
import strainOfTheWeek from './strain-of-the-week';

export const schemaTypes = [
	post,
	blockContent,
	newsletter,
	section,
	category,
	author,
	settings,
	strainOfTheWeek,
];
export const schema: { types: SchemaTypeDefinition[] } = {
	types: schemaTypes,
};
