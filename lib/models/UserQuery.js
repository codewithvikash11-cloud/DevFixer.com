import mongoose from 'mongoose';

const UserQuerySchema = new mongoose.Schema({
    rawErrorInput: {
        type: String,
        required: true,
    },
    aiResponse: {
        type: Object, // Stores the JSON response from Gemini
        required: true,
    },
    savedAsPost: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.models.UserQuery || mongoose.model('UserQuery', UserQuerySchema);
