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

router.route('/').get(blogCtrl.getLatestBlogs);
router.route('/').post(blogCtrl.createBlog);
router.route('/:id').get(blogCtrl.getBlogById);
router.route('/:id').delete(blogCtrl.deleteBlogById);
router.route('/:id').put(blogCtrl.updateBlog);

export default router;
