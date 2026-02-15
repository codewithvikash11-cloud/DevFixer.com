import mongoose from 'mongoose';

const AdminUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'editor'],
        default: 'admin',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);
