const express = require('express');
const router = express.Router();
const {
    getPages,
    getPageById,
    createPage,
    updatePage,
    deletePage
} = require('../controllers/pageController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, admin, getPages)
    .post(protect, admin, createPage);

router.route('/:id')
    .get(protect, admin, getPageById)
    .put(protect, admin, updatePage)
    .delete(protect, admin, deletePage);

module.exports = router;
