const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    errorMessage: {
        type: String,
        required: true
    },
    technology: {
        type: String,
        required: true
    },
    categoryIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    content: {
        whatIsError: String,
        whyOccurs: String,
        solutionSteps: String, // Can be Markdown or HTML
        codeExamples: String,  // Can be Markdown or HTML
        tipsToAvoid: String
    },
    isVisible: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for search (optional but good for future)
articleSchema.index({ title: 'text', errorMessage: 'text' });

module.exports = mongoose.model('Article', articleSchema);
