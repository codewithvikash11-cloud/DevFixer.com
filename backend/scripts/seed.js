const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Category = require('../models/Category');
const Article = require('../models/Article');
const Page = require('../models/Page');
const connectDB = require('../config/db');

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany();
        await Category.deleteMany();
        await Article.deleteMany();
        await Page.deleteMany();

        console.log('Data cleared...');

        // Create Admin User
        const adminUser = await User.create({
            username: 'admin',
            password: 'password123', // Will be hashed by model pre-save hook
            role: 'admin'
        });

        console.log(`Admin created: ${adminUser.username} / password123`);

        // Create Categories
        const categories = await Category.insertMany([
            { name: 'JavaScript', slug: 'javascript', order: 1, isVisible: true },
            { name: 'Python', slug: 'python', order: 2, isVisible: true },
            { name: 'MongoDB', slug: 'mongodb', order: 3, isVisible: true }
        ]);

        console.log(`${categories.length} categories created.`);

        // Create Sample Article
        await Article.create({
            title: 'Fix: undefined is not a function',
            slug: 'undefined-is-not-a-function',
            errorMessage: 'TypeError: undefined is not a function',
            technology: 'JavaScript',
            categoryIds: [categories[0]._id],
            content: {
                whatIsError: 'This error occurs when you try to call a value as a function, but the value is actually undefined.',
                solutionSteps: 'Check the variable name spelling.\nEnsure the function is defined before calling it.',
                codeExamples: 'console.log("Hello World");'
            },
            isVisible: true
        });

        console.log('Sample article created.');

        // Create Sample Page
        await Page.create({
            title: 'About Us',
            slug: 'about-us',
            content: 'Welcome to FixThatError. We help you fix code errors.',
            isVisible: true
        });

        console.log('Sample page created.');

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
