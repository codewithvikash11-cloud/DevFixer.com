const express = require('express');
const router = express.Router();
const {
    getArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    bulkUploadArticles
} = require('../controllers/articleController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(protect, admin, getArticles)
    .post(protect, admin, createArticle);

router.post('/bulk', protect, admin, upload.single('file'), bulkUploadArticles);

router.route('/:id')
    .get(protect, admin, getArticleById)
    .put(protect, admin, updateArticle)
    .delete(protect, admin, deleteArticle);

module.exports = router;
