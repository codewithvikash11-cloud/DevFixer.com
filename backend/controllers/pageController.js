const Page = require('../models/Page');

// @desc    Get all pages (Admin)
// @route   GET /api/pages
// @access  Private/Admin
const getPages = async (req, res) => {
    try {
        const pages = await Page.find({});
        res.json(pages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single page
// @route   GET /api/pages/:id
// @access  Private/Admin
const getPageById = async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);
        if (page) {
            res.json(page);
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a page
// @route   POST /api/pages
// @access  Private/Admin
const createPage = async (req, res) => {
    try {
        const { title, slug, content, isVisible } = req.body;

        const pageExists = await Page.findOne({ slug });
        if (pageExists) {
            return res.status(400).json({ message: 'Page slug already exists' });
        }

        const page = await Page.create({
            title,
            slug,
            content,
            isVisible
        });

        res.status(201).json(page);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a page
// @route   PUT /api/pages/:id
// @access  Private/Admin
const updatePage = async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);

        if (page) {
            page.title = req.body.title || page.title;
            page.slug = req.body.slug || page.slug;
            page.content = req.body.content || page.content;

            if (req.body.isVisible !== undefined) {
                page.isVisible = req.body.isVisible;
            }

            const updatedPage = await page.save();
            res.json(updatedPage);
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a page
// @route   DELETE /api/pages/:id
// @access  Private/Admin
const deletePage = async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);
        if (page) {
            await Page.deleteOne({ _id: page._id });
            res.json({ message: 'Page removed' });
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPages,
    getPageById,
    createPage,
    updatePage,
    deletePage
};
