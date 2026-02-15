import mongoose from 'mongoose';

const ErrorPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this error post.'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    errorText: {
        type: String,
        required: [true, 'Please provide the error text/message.'],
    },
    aiFixExplanation: {
        type: String,
        required: [true, 'Please provide the AI fix explanation.'],
    },
    description: {
        type: String,
        // Meta description / Excerpt
    },
    humanizedContent: {
        type: String,
        // Optional initially, filled by admin later
    },
    language: {
        type: String,
        required: true,
        enum: ['JavaScript', 'Python', 'Java', 'C++', 'Go', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Rust', 'TypeScript', 'General', 'React', 'Next.js', 'Node.js'],
        default: 'General'
    },
    tags: {
        type: [String],
        index: true,
    },
    category: {
        type: String, // Could be ObjectId ref if we make Category schema later
        required: true,
        default: 'Uncategorized'
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// Auto-update updatedAt
ErrorPostSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.models.ErrorPost || mongoose.model('ErrorPost', ErrorPostSchema);
