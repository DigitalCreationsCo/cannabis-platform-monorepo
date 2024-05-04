import { format, parseISO } from 'date-fns';
import { defineField, defineType } from 'sanity';
import { AutoPreviewPane } from '@/components/blog/AutoPreviewPane';
import author from './author';

export default defineType({
	name: 'post',
	title: 'Post',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
				isUnique: (value, context) => context.defaultIsUnique(value, context),
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
			rows: 4,
		}),
		defineField({
			name: 'mainImage',
			title: 'Main image',
			type: 'image',
			options: {
				metadata: ['blurhash', 'lqip'],
				storeOriginalFilename: true,
				hotspot: true,
			},
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'blockContent',
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: [{ type: author.name }],
		}),
		defineField({
			name: 'shareImage',
			title: 'Social Media Image',
			description:
				"A social media image generated by Next.js. It can't modified.",
			type: 'image',
			readOnly: true,
			options: {
				metadata: ['blurhash', 'lqip'],
			},
		}),
		defineField({
			name: 'categories',
			title: 'Categories',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'category' } }],
		}),
		defineField({
			name: 'isPublishedInNewsLetter',
			title: 'Is Published In CI NewsLetter',
			type: 'boolean',
			description:
				'If true, this post has been published in the Cannabis Insider Newsletter.',
			options: {
				layout: 'checkbox',
			},
			readOnly: false,
			initialValue: false,
		}),
		defineField({
			name: 'isPublishedToSocialMedia',
			title: 'Is Published To Social Media Accounts',
			type: 'boolean',
			description:
				'If true, this post has been pushed to Twitter, Facebook, and Instagram.',
			options: {
				layout: 'checkbox',
			},
			readOnly: false,
			initialValue: false,
		}),
		defineField({
			type: 'string',
			name: 'contentUrl',
			title: 'Content URL',
		}),
		defineField({
			type: 'string',
			name: 'hiddenPreviewField',
			components: {
				field: AutoPreviewPane,
			},
		}),
	],
	preview: {
		select: {
			title: 'title',
			author: 'author.name',
			date: '_createdAt',
			media: 'mainImage',
			slug: 'slug.current',
			contentUrl: 'contentUrl',
		},
		prepare({ title, media, author, date }) {
			const subtitles = [
				author && `by ${author}`,
				date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
			].filter(Boolean);
			return { title, media, subtitle: subtitles.join(' ') };
		},
	},
});
