import { ArticleWithDetails } from '@cd/data-access';
import { isArray, reconcileStateArray } from '../../src/utils/object.util';
import { saveArticlesByTag } from '../../src/reducer/blog.reducer';

describe('saveArticlesByTag ', () => {
	test(' correct save articles to state using tag property, with no duplicate articles', () => {
		const state = new Map();
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
		] as ArticleWithDetails[];
		expect(saveArticlesByTag(state, articles)).toStrictEqual(articles);
	});
});
