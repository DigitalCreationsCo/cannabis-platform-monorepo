/* eslint-disable sonarjs/no-duplicate-string */
import {
	type ArticleTag,
	type ArticleCreateType,
	type Prisma,
} from '@gras/data-access';
import { ArticleDA } from '../data-access';

/* =================================
BlogController - controller class for Blog data management

members:
getLatestArticles
getArticlesByTags
getDispensaryArticles
getDriverArticles
createBlogArticle
updateArticle
getArticleById
deleteArticleById

================================= */

export default class BlogController {
	static async getLatestArticles(req, res) {
		try {
			const data = await ArticleDA.getArticles();
			if (!data)
				return res.status(404).json({
					success: 'false',
					message: 'Article not found.',
					error: 'Article not found.',
				});
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('getLatestArticles server: ', error.message);
			res.status(500).json({
				success: 'false',
				message: error.message,
			});
		}
	}

	static async getArticlesByTags(req, res) {
		try {
			const tags: ArticleTag[] = req.body;
			const data = await ArticleDA.getArticlesByTags(tags);
			if (!data)
				return res.status(404).json({
					success: 'false',
					message: 'Article not found.',
					error: 'Article not found.',
				});
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('getLatestArticles server: ', error.message);
			res.status(500).json({
				success: 'false',
				message: error.message,
			});
		}
	}

	static async getDispensaryArticles(req, res) {
		try {
			const data = await ArticleDA.getArticlesByTags('dispensaries');
			if (!data)
				return res.status(404).json({
					success: 'false',
					message: 'Articles not found.',
					error: 'Articles not found.',
				});
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('getDispensaryArticles: ', error.message);
			res.status(500).json({
				success: 'false',
				message: error.message,
			});
		}
	}
	static async getDriverArticles(req, res) {
		try {
			const data = await ArticleDA.getArticlesByTags('drivers');
			if (!data)
				return res.status(404).json({
					success: 'false',
					message: 'Articles not found.',
					error: 'Articles not found.',
				});
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('API error: ', error.message);
			res.status(500).json({
				success: 'false',
				message: error.message,
			});
		}
	}

	static async createBlogArticle(req, res) {
		try {
			const blog: ArticleCreateType = req.body;
			const data = await ArticleDA.createArticle(blog);
			if (!data)
				return res.status(400).json({
					success: 'false',
					message: 'Blog could not be created.',
				});
			return res.status(201).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('createBlog: ', error.message);
			res.status(500).json({
				success: 'false',
				message: error.message,
				error: error.message,
			});
		}
	}

	static async updateArticle(req, res) {
		try {
			const blog: Prisma.ArticleUpdateInput = req.body;
			const data = await ArticleDA.updateArticle(blog);
			if (!data)
				return res.status(404).json({
					success: 'false',
					message: 'Blog could not be updated.',
				});
			return res.status(201).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('updateArticle: ', error.message);
			res.status(500).json({
				success: 'false',
				message: error.message,
			});
		}
	}

	static async deleteArticleById(req, res) {
		try {
			const blogId = req.params.id || '';
			const data = await ArticleDA.deleteArticle(blogId);
			if (!data)
				return res.status(404).json({
					success: 'false',
					message: 'Blog could not be deleted.',
				});
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			console.info('deleteArticleById: ', error.message);
			res.status(500).json({
				success: 'false',
				message: error.message,
			});
		}
	}

	static async getArticleById(req, res) {
		try {
			const blogId = req.params.id || '';
			const data = await ArticleDA.getArticleById(blogId);
			if (!data)
				return res.status(404).json({
					success: 'false',
					message: 'Article not found',
				});
			return res.status(200).json({
				success: 'true',
				payload: data,
			});
		} catch (error: any) {
			res.status(500).json({
				success: 'false',
				message: error.message,
			});
		}
	}
}
