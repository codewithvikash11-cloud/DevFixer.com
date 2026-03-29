const Category = require('../models/Category');
const Article = require('../models/Article');
const Page = require('../models/Page');

// @desc    Get all visible categories
// @route   GET /api/public/categories
// @access  Public
const getPublicCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isVisible: true }).sort({ order: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all visible articles
// @route   GET /api/public/errors
// @access  Public
const getPublicArticles = async (req, res) => {
    try {
        const articles = await Article.find({ isVisible: true })
            .select('title slug errorMessage technology categoryIds createdAt views')
            .populate('categoryIds', 'name slug');
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single visible article by slug
// @route   GET /api/public/errors/:slug
// @access  Public
const getPublicArticleBySlug = async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug, isVisible: true })
            .populate('categoryIds', 'name slug');

        if (article) {
            // Increment views
            article.views += 1;
            await article.save();
            res.json(article);
        } else {
            res.status(404).json({ message: 'Error article not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single visible page by slug
// @route   GET /api/public/pages/:slug
// @access  Public
const getPublicPageBySlug = async (req, res) => {
    try {
        const page = await Page.findOne({ slug: req.params.slug, isVisible: true });

        if (page) {
            res.json(page);
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPublicCategories,
    getPublicArticles,
    getPublicArticleBySlug,
    getPublicPageBySlug
};
