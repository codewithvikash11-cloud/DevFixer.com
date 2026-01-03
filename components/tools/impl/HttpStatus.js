"use client";

import React, { useState } from 'react';
import { Activity, Search } from 'lucide-react';

const STATUS_CODES = [
    { code: 200, title: "OK", desc: "Standard response for successful HTTP requests." },
    { code: 201, title: "Created", desc: "Request has been fulfilled and a new resource created." },
    { code: 204, title: "No Content", desc: "Request processed successfully, but no content returned." },
    { code: 301, title: "Moved Permanently", desc: "This and all future requests should be directed to the given URI." },
    { code: 302, title: "Found", desc: "Resource temporarily moved to a different URI." },
    { code: 304, title: "Not Modified", desc: "Resource has not been modified since the last request." },
    { code: 400, title: "Bad Request", desc: "Server cannot process the request due to client error." },
    { code: 401, title: "Unauthorized", desc: "Authentication is required and has failed or not been provided." },
    { code: 403, title: "Forbidden", desc: "The request is valid, but the server is refusing action." },
    { code: 404, title: "Not Found", desc: "The requested resource could not be found but may be available in the future." },
    { code: 429, title: "Too Many Requests", desc: "User has sent too many requests in a given amount of time." },
    { code: 500, title: "Internal Server Error", desc: "A generic error message, given when an unexpected condition was encountered." },
    { code: 502, title: "Bad Gateway", desc: "The server received an invalid response from the upstream server." },
    { code: 503, title: "Service Unavailable", desc: "The server is currently unavailable (overloaded or down for maintenance)." },
    { code: 504, title: "Gateway Timeout", desc: "The server did not receive a timely response from the upstream server." },
];

export default function HttpStatus() {
    const [search, setSearch] = useState('');

    const filtered = STATUS_CODES.filter(s =>
        s.code.toString().includes(search) ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.desc.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col gap-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <Activity className="text-accent-primary" />
                HTTP Status Codes
            </h3>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
                <input
                    type="text"
                    placeholder="Search by code or description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-3 pl-12 bg-surface border border-border rounded-xl focus:border-accent-primary outline-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2">
                {filtered.map(status => (
                    <div key={status.code} className={`p-4 rounded-xl border border-border hover:border-accent-primary/50 transition-all group ${status.code >= 500 ? 'bg-red-500/5' :
                            status.code >= 400 ? 'bg-orange-500/5' :
                                status.code >= 300 ? 'bg-blue-500/5' :
                                    'bg-green-500/5'
                        }`}>
                        <div className="flex items-center justify-between mb-2">
                            <span className={`text-2xl font-black ${status.code >= 500 ? 'text-red-500' :
                                    status.code >= 400 ? 'text-orange-500' :
                                        status.code >= 300 ? 'text-blue-500' :
                                            'text-green-500'
                                }`}>{status.code}</span>
                        </div>
                        <h4 className="font-bold text-text-primary mb-1">{status.title}</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">{status.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
