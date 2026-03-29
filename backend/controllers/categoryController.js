const Category = require('../models/Category');

// @desc    Get all categories (Admin)
// @route   GET /api/categories
// @access  Private/Admin
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).sort({ order: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Private/Admin
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
    try {
        const { name, slug, parentCategory, order, isVisible, seoTitle, seoDescription } = req.body;

        const categoryExists = await Category.findOne({ slug });
        if (categoryExists) {
            return res.status(400).json({ message: 'Category slug already exists' });
        }

        const category = await Category.create({
            name,
            slug,
            parentCategory,
            order,
            isVisible,
            seoTitle,
            seoDescription
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (category) {
            category.name = req.body.name || category.name;
            category.slug = req.body.slug || category.slug;

            // Specifically handle allow setting to null or false
            if (req.body.parentCategory !== undefined) category.parentCategory = req.body.parentCategory;
            if (req.body.order !== undefined) category.order = req.body.order;
            if (req.body.isVisible !== undefined) category.isVisible = req.body.isVisible;

            category.seoTitle = req.body.seoTitle || category.seoTitle;
            category.seoDescription = req.body.seoDescription || category.seoDescription;

            const updatedCategory = await category.save();
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (category) {
            await Category.deleteOne({ _id: category._id });
            res.json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
