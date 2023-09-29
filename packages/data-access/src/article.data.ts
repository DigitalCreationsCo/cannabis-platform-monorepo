import {
	type Article,
	type ArticleType,
	type ImageArticle,
	type Prisma,
} from '@prisma/client';
import prisma from './db/prisma';

export async function findArticlesByType(
	tag: ArticleType,
): Promise<ArticleWithDetails[]> {
	try {
		const articles = await prisma.article.findMany({
			where: { tag },
			include: {
				image: true,
			},
			orderBy: {
				updatedAt: 'desc',
			},
		});

		return articles as ArticleWithDetails[];
	} catch (error: any) {
		console.error(error);
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
		console.error(error);
		throw new Error(error);
	}
}

export async function createArticle(
	article: Prisma.ArticleCreateInput,
): Promise<ArticleWithDetails | null> {
	try {
		const _article = await prisma.article.create({
			data: article,
			include: {
				image: true,
			},
		});
		return _article as ArticleWithDetails;
	} catch (error: any) {
		console.error(error);
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
		console.error(error);
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
		console.error(error);
		throw new Error(error);
	}
}

export type ArticleWithDetails = Article & { image: ImageArticle };
