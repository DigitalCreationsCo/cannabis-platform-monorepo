import {
	type Article,
	type ArticleTag,
	type ImageArticle,
	type Prisma,
} from '@prisma/client';
import prisma from './db/prisma';

export async function findArticles(): Promise<ArticleWithDetails[]> {
	try {
		return (await prisma.article.findMany({
			where: { tag: { notIn: ['drivers', 'dispensaries'] } },
			include: {
				image: true,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		})) as ArticleWithDetails[];
	} catch (error: any) {
		console.error('findArticles: ', error);
		throw new Error(error);
	}
}

export async function findArticlesByType(
	tag: ArticleTag | ArticleTag[],
): Promise<ArticleWithDetails[]> {
	try {
		const articles = await prisma.article.findMany({
			where: { tag: { in: tag } },
			include: {
				image: true,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		});
		return articles as ArticleWithDetails[];
	} catch (error: any) {
		console.error('findArticlesByType: ', error);
		throw new Error(error);
	}
}

export async function findArticleById(
	id: string,
): Promise<ArticleWithDetails | null> {
	try {
		const article = await prisma.article.findUnique({
			where: {
				id,
			},
			include: {
				image: true,
			},
		});
		return article as ArticleWithDetails;
	} catch (error: any) {
		console.error('findArticleById: ', error);
		throw new Error(error);
	}
}

export async function createArticle(
	article: ArticleCreateType,
): Promise<ArticleWithDetails | null> {
	try {
		const _article = await prisma.article.create({
			data: {
				...article,
				image: {
					create: {
						...article.image,
					},
				},
			},
			include: {
				image: true,
			},
		});
		return _article as ArticleWithDetails;
	} catch (error: any) {
		console.error('createArticle: ', error);
		throw new Error(error);
	}
}

export async function updateArticle(
	article: Prisma.ArticleUpdateInput,
): Promise<ArticleWithDetails | null> {
	try {
		const _update = await prisma.article.update({
			where: { id: article.id as string },
			data: article,
			include: {
				image: true,
			},
		});
		return _update as ArticleWithDetails;
	} catch (error: any) {
		console.error('updateArticle: ', error);
		throw new Error(error);
	}
}

export async function deleteArticle(id: string) {
	try {
		return await prisma.article.delete({
			where: {
				id,
			},
		});
	} catch (error: any) {
		console.error('deleteArticle: ', error);
		throw new Error(error);
	}
}

export type ArticleWithDetails = Article & { image: ImageArticle };
export type ArticleCreateType = Prisma.ArticleCreateInput & {
	image: ImageArticle;
};
