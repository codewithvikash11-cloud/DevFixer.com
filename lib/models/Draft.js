
import mongoose from 'mongoose';

const DraftSchema = new mongoose.Schema({
    title: { type: String, required: true },
    error: { type: String, required: true }, // The original error input
    solution: { type: Object, required: true }, // The full JSON response from AI
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Draft || mongoose.model('Draft', DraftSchema);
