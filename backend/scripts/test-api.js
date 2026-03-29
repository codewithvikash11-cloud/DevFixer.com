const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const runTests = async () => {
    try {
        console.log('--- Starting API Tests ---');

        // 1. Login Admin
        console.log('\n1. Testing Admin Login...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            username: 'admin',
            password: 'password123'
        });

        if (loginRes.status === 200 && loginRes.data.token) {
            console.log('✅ Login Successful');
        } else {
            console.error('❌ Login Failed');
            return;
        }

        const token = loginRes.data.token;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        // 2. Create Category
        console.log('\n2. Testing Create Category...');
        const catRes = await axios.post(`${API_URL}/categories`, {
            name: 'Test Category',
            slug: 'test-category',
            order: 10,
            isVisible: true
        }, config);

        if (catRes.status === 201) {
            console.log('✅ Category Created');
        } else {
            console.error('❌ Category Creation Failed');
        }
        const categoryId = catRes.data._id;

        // 3. Create Article
        console.log('\n3. Testing Create Article...');
        const artRes = await axios.post(`${API_URL}/articles`, {
            title: 'Test Article',
            slug: 'test-article-123',
            errorMessage: 'Test Error',
            technology: 'Test Tech',
            categoryIds: [categoryId],
            content: { whatIsError: 'Testing' },
            isVisible: true
        }, config);

        if (artRes.status === 201) {
            console.log('✅ Article Created');
        } else {
            console.error('❌ Article Creation Failed');
        }

        // 4. Public API: Get Categories
        console.log('\n4. Testing Public Categories...');
        const pubCatRes = await axios.get(`${API_URL}/public/categories`);
        if (pubCatRes.status === 200 && pubCatRes.data.length > 0) {
            console.log(`✅ Public Categories Fetched (${pubCatRes.data.length})`);
        } else {
            console.error('❌ Public Categories Failed');
        }

        // 5. Public API: Get Articles
        console.log('\n5. Testing Public Articles...');
        const pubArtRes = await axios.get(`${API_URL}/public/errors`);
        if (pubArtRes.status === 200 && pubArtRes.data.length > 0) {
            console.log(`✅ Public Articles Fetched (${pubArtRes.data.length})`);
        } else {
            console.error('❌ Public Articles Failed');
        }

        console.log('\n--- Tests Completed Successfully ---');

    } catch (error) {
        console.error('\n❌ Test Failed:', error.response ? error.response.data : error.message);
    }
};

// Wait for server to start if running immediately
setTimeout(runTests, 2000);
