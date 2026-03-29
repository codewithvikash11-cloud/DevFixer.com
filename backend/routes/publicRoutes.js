const express = require('express');
const router = express.Router();
const {
    getPublicCategories,
    getPublicArticles,
    getPublicArticleBySlug,
    getPublicPageBySlug
} = require('../controllers/publicController');

router.get('/categories', getPublicCategories);
router.get('/errors', getPublicArticles);
router.get('/errors/:slug', getPublicArticleBySlug);
router.get('/pages/:slug', getPublicPageBySlug);

module.exports = router;
