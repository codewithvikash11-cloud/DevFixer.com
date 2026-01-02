"use client";

import React, { useState } from 'react';
import { useNavbar } from '@/context/NavbarContext';
import RequestPanel from '@/components/api-tester/RequestPanel';
import ResponsePanel from '@/components/api-tester/ResponsePanel';
import CodeOrbitFooter from '@/components/compiler/CodeOrbitFooter';

export default function ApiTesterPage() {

    const [request, setRequest] = useState({
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        method: 'GET',
        headers: [{ key: '', value: '' }],
        body: '{}'
    });

    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSend = async () => {
        setIsLoading(true);
        setError(null);
        setResponse(null);

        try {
            // Convert headers array to object
            const headerObj = {};
            request.headers.forEach(h => {
                if (h.key.trim()) headerObj[h.key] = h.value;
            });

            // Parse body if method allows
            let bodyData = undefined;
            if (!['GET', 'HEAD'].includes(request.method) && request.body) {
                try {
                    bodyData = JSON.parse(request.body);
                } catch (e) {
                    throw new Error("Invalid JSON in request body");
                }
            }

            const res = await fetch('/api/proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: request.url,
                    method: request.method,
                    headers: headerObj,
                    body: bodyData
                })
            });

            const data = await res.json();
            setResponse(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // NAVBAR SYNC
    const { setHideSearch } = useNavbar();

    React.useEffect(() => {
        setHideSearch(true);
        return () => setHideSearch(false);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-background font-sans text-text-primary">
            <main className="flex-1 container mx-auto px-4 py-8 md:py-10 max-w-7xl animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">API Tester</h1>
                        <p className="text-text-secondary mt-2">Test APIs securely with our production-ready proxy.</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 h-[800px] lg:h-[600px]">
                    {/* Left: Request Configuration */}
                    <div className="flex flex-col h-full bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
                        <RequestPanel
                            request={request}
                            setRequest={setRequest}
                            onSend={handleSend}
                            isLoading={isLoading}
                        />
                    </div>

                    {/* Right: Response Viewer */}
                    <div className="flex flex-col h-full bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
                        <ResponsePanel
                            response={response}
                            error={error}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </main>

            <CodeOrbitFooter />
        </div>
    );
}
