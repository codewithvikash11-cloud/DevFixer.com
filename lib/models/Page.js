import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    seoDescription: String,
    status: { type: String, enum: ['published', 'draft'], default: 'draft' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Page || mongoose.model('Page', PageSchema);
