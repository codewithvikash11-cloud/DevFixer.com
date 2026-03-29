const Article = require('../models/Article');
const Category = require('../models/Category');
const fs = require('fs');
const csv = require('csv-parser');

// @desc    Get all articles (Admin)
// @route   GET /api/articles
// @access  Private/Admin
const getArticles = async (req, res) => {
    try {
        const articles = await Article.find({}).populate('categoryIds', 'name');
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single article
// @route   GET /api/articles/:id
// @access  Private/Admin
const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('categoryIds', 'name');
        if (article) {
            res.json(article);
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an article
// @route   POST /api/articles
// @access  Private/Admin
const createArticle = async (req, res) => {
    try {
        const { title, slug, errorMessage, technology, categoryIds, content, isVisible } = req.body;

        const articleExists = await Article.findOne({ slug });
        if (articleExists) {
            return res.status(400).json({ message: 'Article slug already exists' });
        }

        const article = await Article.create({
            title,
            slug,
            errorMessage,
            technology,
            categoryIds,
            content,
            isVisible
        });

        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update an article
// @route   PUT /api/articles/:id
// @access  Private/Admin
const updateArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (article) {
            article.title = req.body.title || article.title;
            article.slug = req.body.slug || article.slug;
            article.errorMessage = req.body.errorMessage || article.errorMessage;
            article.technology = req.body.technology || article.technology;
            article.categoryIds = req.body.categoryIds || article.categoryIds;

            if (req.body.content) {
                article.content = { ...article.content, ...req.body.content };
            }

            if (req.body.isVisible !== undefined) {
                article.isVisible = req.body.isVisible;
            }

            const updatedArticle = await article.save();
            res.json(updatedArticle);
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete an article
// @route   DELETE /api/articles/:id
// @access  Private/Admin
const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (article) {
            await Article.deleteOne({ _id: article._id });
            res.json({ message: 'Article removed' });
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Bulk upload articles via CSV
// @route   POST /api/articles/bulk
// @access  Private/Admin
const bulkUploadArticles = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a CSV file' });
        }

        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    const articlesToInsert = [];

                    for (const row of results) {
                        // Simplified logic: Assume CSV headers: title, errorMessage, technology, categorySlug
                        // Auto generate slug from title
                        const slug = row.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)+/g, '');

                        // Find category ID by slug (if provided)
                        let categoryIds = [];
                        if (row.categorySlug) {
                            const category = await Category.findOne({ slug: row.categorySlug });
                            if (category) categoryIds.push(category._id);
                        }

                        // Check duplicate slug
                        const exists = await Article.findOne({ slug });
                        if (!exists) {
                            articlesToInsert.push({
                                title: row.title,
                                slug: slug,
                                errorMessage: row.errorMessage,
                                technology: row.technology,
                                categoryIds: categoryIds,
                                content: {
                                    whatIsError: "Auto generated content",
                                    solutionSteps: "Pending update"
                                },
                                isVisible: false // Default to hidden for bulk upload
                            });
                        }
                    }

                    if (articlesToInsert.length > 0) {
                        await Article.insertMany(articlesToInsert);
                    }

                    // Clean up file
                    fs.unlinkSync(req.file.path);

                    res.status(201).json({
                        message: `${articlesToInsert.length} articles uploaded successfully`,
                        skipped: results.length - articlesToInsert.length
                    });
                } catch (error) {
                    fs.unlinkSync(req.file.path); // Clean up on error
                    res.status(500).json({ message: error.message });
                }
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    bulkUploadArticles
};
