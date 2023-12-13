import { defineField, defineType } from 'sanity';

export default defineType({
	title: 'Section',
	name: 'section',
	type: 'document',
	fields: [
		defineField({
						name: 'title',
						title: 'Title',
						type: 'string',
		}),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        }),
	]
});
