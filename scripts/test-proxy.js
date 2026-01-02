// No imports needed for Node 18+ native fetch

async function testProxy() {
    const proxyUrl = 'http://localhost:3000/api/proxy';

    console.log('🧪 Testing API Proxy...');

    try {
        const response = await fetch(proxyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3000' // Simulate valid origin
            },
            body: JSON.stringify({
                url: 'https://jsonplaceholder.typicode.com/todos/1',
                method: 'GET',
                headers: {
                    'X-Test-Header': 'DevFixer'
                }
            })
        });

        // Check content type before parsing
        const contentType = response.headers.get('content-type');
        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            console.log('Response (Text):', text);
            throw new Error('Expected JSON response');
        }

        console.log('------------------------------------------------');
        console.log(`Status: ${response.status}`);
        console.log('Response Body:');
        console.log(JSON.stringify(data, null, 2));
        console.log('------------------------------------------------');

        if (data.success && data.request.url === 'https://jsonplaceholder.typicode.com/todos/1') {
            console.log('✅ Proxy Test Passed!');
        } else {
            console.error('❌ Proxy Test Failed!');
        }

    } catch (error) {
        console.error('❌ Test Script Error:', error);
    }
}

testProxy();
