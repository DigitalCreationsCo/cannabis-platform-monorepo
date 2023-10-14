import { Router } from 'express';
import { blogCtrl } from '../controllers';
const router = Router();
/* =================================
Blog Routes

"/"                     GET getLatestBlogs
"/"                     POST createBlog
"/:id"                  PUT updateBlog
"/:id"                  GET getBlogById
"/:id"                  DELETE deleteBlogById

================================= */

router.route('/').get(blogCtrl.getLatestArticles);
router.route('/tag').post(blogCtrl.getArticlesByTags);
router.route('/').post(blogCtrl.createBlogArticle);
router.route('/:id').get(blogCtrl.getArticleById);
router.route('/:id').delete(blogCtrl.deleteArticleById);
router.route('/:id').put(blogCtrl.updateArticle);

export default router;
