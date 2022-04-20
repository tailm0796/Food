const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router
  .route('/articles')
  .get(articleController.getAllArticles)
  .post(articleController.postArticle);
router.get('/new', articleController.newArticle);
router.route('/:slug').get(articleController.getArticle);
router
  .route('/:id')
  .put(articleController.putArticle)
  .delete(articleController.deleteArticle);
router.get('/edit/:id', articleController.editArticle);

module.exports = router;
