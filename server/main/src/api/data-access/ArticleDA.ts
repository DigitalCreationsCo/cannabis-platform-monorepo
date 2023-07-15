import { ArticleType, createArticle, deleteArticle, findArticleById, findArticlesByType, Prisma, updateArticle } from "@cd/data-access";

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
    static async getArticles(tags: ArticleType[] = ["news"]) {
        try {
            const data = await findArticlesByType(tags);
            return data;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getArticlesDispensaryGuides() {
        try {
            const data = await findArticlesByType(["dispensary"]);
            return data;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getArticlesDriverGuides() {
        try {
            const data = await findArticlesByType(["driver"]);
            return data;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getArticlesByTags(tags: ArticleType[]) {
        try {
            const data = await findArticlesByType(tags);
            return data;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async getArticleById(id: string) {
        try {
            const data = await findArticleById(id);
            return data;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async createArticle(article: Prisma.ArticleCreateInput) {
        try {
            const data = await createArticle(article);
            return data;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async updateArticle(article: Prisma.ArticleUpdateInput) {
        try {
            const data = await updateArticle(article);
            return data;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async deleteArticle(id: string) {
        try {
            const data = await deleteArticle(id);
            return data;
        } catch (error: any) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
