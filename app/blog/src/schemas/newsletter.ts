import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
tent'
 *  }
 */
export default defineType({
	title: 'Newsletter',
	name: 'newsletter',
	type: 'document',
	fields: [
		defineField({
			title: 'Greeting',
			name: 'greeting',
						type: 'string',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'array',
			of: [
				defineArrayMember({
					title: 'Section',
					type: 'section',
				})
			]
		}),
		defineField({
			title: 'Outro',
			name: 'outro',
			type: 'string',
		}),
	]
});
