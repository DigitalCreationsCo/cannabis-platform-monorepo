import { Prisma } from '@cd/data-access';
import { ArticleDA } from '../data-access';

/* =================================
BlogController - controller class for Blog data management

members:
getLatestNews
createBlog
updateBlog
getBlogById
deleteBlogById

================================= */

export default class BlogController {

    static async getLatestNews(req, res) {
        try {
            const data = await ArticleDA.getArticles();

            if (!data)
                return res.status(404).json({
                    success: false,
                    message: 'Blog could not be created.',
                });

            return res.status(201).json({
                success: true,
                payload: data,
            });
        } catch (error: any) {
            console.info('API error: ', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async getDispensaryGuides(req, res) {
        try {
            const data = await ArticleDA.getArticles(["dispensary"]);

            if (!data)
                return res.status(404).json({
                    success: false,
                    message: 'Blog could not be created.',
                });

            return res.status(201).json({
                success: true,
                payload: data,
            });
        } catch (error: any) {
            console.info('API error: ', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async getDriverGuides(req, res) {
        try {
            const data = await ArticleDA.getArticles(["driver"]);

            if (!data)
                return res.status(404).json({
                    success: false,
                    message: 'Blog could not be created.',
                });

            return res.status(201).json({
                success: true,
                payload: data,
            });
        } catch (error: any) {
            console.info('API error: ', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async createBlog(req, res) {
        try {
            const blog: Prisma.ArticleCreateInput = req.body;

            const data = await ArticleDA.createArticle(blog);

            if (!data)
                return res.status(404).json({
                    success: false,
                    message: 'Blog could not be created.',
                });

            return res.status(201).json({
                success: true,
                payload: data,
            });
        } catch (error: any) {
            console.info('API error: ', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async updateBlog(req, res) {
        try {
            const blog: Prisma.ArticleUpdateInput = req.body;

            const data = await ArticleDA.updateArticle(blog);

            if (!data)
                return res.status(404).json({
                    success: false,
                    message: 'Blog could not be created.',
                });

            return res.status(201).json({
                success: true,
                payload: data,
            });
        } catch (error: any) {
            console.info('API error: ', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async deleteBlogById(req, res) {
        try {
            const blogId = req.params.id || '';

            const data = await ArticleDA.deleteArticle(blogId);

            if (!data)
                return res.status(404).json({
                    success: false,
                    message: 'Blog could not be deleted.',
                });

            return res.status(201).json({
                success: true,
                payload: data,
            });
        } catch (error: any) {
            console.info('API error: ', error.message);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    static async getBlogById(req, res) {
        try {
            const blogId = req.params.id || '';

            const data = await ArticleDA.getArticleById(blogId);

            if (!data)
                return res.status(404).json({
                    success: false,
                    message: 'Dispensary not found',
                });

            return res.status(200).json({
                success: true,
                payload: data,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}
