const Article = require('../models/article');
const catchAsync = require('../utils/catchAsync');

module.exports.newArticle = (req, res) => {
  res.render('articles/new', { article: new Article() });
};

module.exports.getAllArticles = catchAsync(async (req, res) => {
  const articles = await Article.findById(req.params.id);
  res.render('/', { articles: articles });
});

module.exports.editArticle = catchAsync(async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render('articles/edit', { article: article });
});

module.exports.getArticle = catchAsync(async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect('/');
  res.render('articles/show', { article: article });
});

module.exports.postArticle = catchAsync(async (req, res) => {
  req.article = new Article();
  next();
  // res.send('Hello');
}, saveArticleAndRedirect('new'));

module.exports.putArticle = catchAsync(async (req, res) => {
  req.article = await Article.findById(req.params.id);
  next();
}, saveArticleAndRedirect('edit'));

module.exports.deleteArticle = catchAsync(async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article.markModified('articles');
      article = await article.create();
      res.redirect(`/articles/${article.slug}`);
      next();
    } catch (e) {
      res.render(`articles/${path}`, { article: article });
    }
  };
}
