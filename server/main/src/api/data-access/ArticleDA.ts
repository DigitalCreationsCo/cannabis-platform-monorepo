import {
	createArticle,
	deleteArticle,
	findArticleById,
	findArticlesByType,
	updateArticle,
	type ArticleCreateType,
	type ArticleType,
	type Prisma,
} from '@cd/data-access';

/* =================================
Article Data Access - data class for article table

members:
getArticlesNews
getArticlesDispensaryGuides
getArticlesDriverGuides
getArticlesByTags
getArticleById
createArticle
updateArticle
deleteArticle

================================= */

export default class ArticleDA {
	static async getArticles(tag: ArticleType = 'news') {
		try {
			return await findArticlesByType(tag);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async getArticlesDispensaryGuides() {
		try {
			return await findArticlesByType('dispensary');
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async getArticlesDriverGuides() {
		try {
			return await findArticlesByType('driver');
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async getArticlesByTags(tag: ArticleType) {
		try {
			return await findArticlesByType(tag);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async getArticleById(id: string) {
		try {
			return await findArticleById(id);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async createArticle(article: ArticleCreateType) {
		try {
			return await createArticle(article);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async updateArticle(article: Prisma.ArticleUpdateInput) {
		try {
			return await updateArticle(article);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}

	static async deleteArticle(id: string) {
		try {
			return await deleteArticle(id);
		} catch (error: any) {
			console.error(error.message);
			throw new Error(error.message);
		}
	}
}
