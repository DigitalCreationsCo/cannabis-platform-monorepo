import { type SchemaTypeDefinition } from 'sanity';

import blockContent from './blockContent';
import category from './category';
import newsletter from './newsletter';
import post from './post';
import section from './section';

export const schemaTypes = [post, blockContent, newsletter, section, category];
export const schema: { types: SchemaTypeDefinition[] } = {
	types: [post, blockContent, newsletter, section, category],
};
