export default {
	name: 'strainOfTheWeek',
	title: 'Strain of the Week',
	type: 'document',
	fields: [
		{ name: 'title', title: 'Title', type: 'string' },
		{ name: 'image', title: 'Image', type: 'image' },
		{ name: 'testimonial1', title: 'Testimonial 1', type: 'string' },
		{ name: 'testimonial2', title: 'Testimonial 2', type: 'string' },
		{ name: 'flavorProfile', title: 'Flavor Profile', type: 'text' },
		{
			name: 'ratings',
			title: 'Ratings',
			type: 'object',
			fields: [
				{ name: 'flavor', title: 'Flavor', type: 'number' },
				{ name: 'stink', title: 'Stink', type: 'number' },
				{ name: 'smoke', title: 'Smoke', type: 'number' },
				{ name: 'sensation', title: 'Sensation', type: 'number' },
			],
		},
		{ name: 'seoTitle', title: 'SEO Title', type: 'string' },
		{ name: 'seoDescription', title: 'SEO Description', type: 'text' },
		{
			name: 'seoKeywords',
			title: 'SEO Keywords',
			type: 'array',
			of: [{ type: 'string' }],
		},
	],
};
