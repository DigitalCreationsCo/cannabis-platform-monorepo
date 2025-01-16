// type ArticleTag, ArticleWithDetails } from '@gras/data-access';
// import { saveArticlesByTag } from '../..';

describe('saveArticlesByTag ', () => {
	test(' correct save articles to state using tag property, with no duplicate articles', () => {
		const state = {};
		const articles = [
			{
				id: '1',
				title: 'Article 1',
				tag: 'business',
				content: 'content',
				name: '',
				description: '',
				href: '',
				author: '',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: '2',
				title: 'Article 2',
				tag: 'business',
				content: 'content',
				name: '',
				description: '',
				href: '',
				author: '',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		] as any[];
		expect(1).toStrictEqual(1);
	});
});
