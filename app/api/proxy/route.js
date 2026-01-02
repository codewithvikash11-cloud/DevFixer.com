import { NextResponse } from 'next/server';

/**
 * DevFixer API Proxy
 * 
 * A secure, production-ready proxy to handle external API requests.
 * Features:
 * - CORS protection
 * - Request validation
 * - Standardized error handling
 * - Execution time tracking
 */

// 1. configuration
const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'https://dev-fixer-com.vercel.app',
    'https://devfixer.com',
    'https://www.devfixer.com'
];

const BLOCKED_HEADERS = [
    'host',
    'connection',
    'content-length',
    'transfer-encoding',
    'date',
    'expect',
    'cookie', // Block cookies for security unless explicitly required
    'set-cookie'
];

// 2. Helper Functions
function getCorsHeaders(origin) {
    // If exact match or localhost (for dev flexibility), allow it.
    // Otherwise fallback to null/strict.
    const isAllowed = ALLOWED_ORIGINS.includes(origin) || (origin && origin.includes('localhost'));

    return {
        'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400',
    };
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// 3. OPTIONS Handler (Preflight)
export async function OPTIONS(request) {
    const origin = request.headers.get('origin') || '';
    return new NextResponse(null, {
        status: 204,
        headers: getCorsHeaders(origin),
    });
}

// 4. Main POST Handler
export async function POST(request) {
    const startTime = Date.now();
    const origin = request.headers.get('origin') || '';
    const corsHeaders = getCorsHeaders(origin);

    // 4.1 Strict Origin Check (Production Security)
    if (process.env.NODE_ENV === 'production' && !ALLOWED_ORIGINS.includes(origin)) {
        return NextResponse.json(
            {
                success: false,
                error: 'CORS policy violation: Origin not allowed.',
                status: 403
            },
            { status: 403, headers: corsHeaders }
        );
    }

    try {
        // 4.2 Parse Body
        const body = await request.json().catch(() => ({}));
        const { url, method = 'GET', headers = {}, body: data } = body;

        // 4.3 Validation
        if (!url || !isValidUrl(url)) {
            return NextResponse.json(
                { success: false, error: 'Invalid or missing "url" parameter.', status: 400 },
                { status: 400, headers: corsHeaders }
            );
        }

        const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'];
        if (!validMethods.includes(method.toUpperCase())) {
            return NextResponse.json(
                { success: false, error: `Method "${method}" is not supported.`, status: 405 },
                { status: 405, headers: corsHeaders }
            );
        }

        // 4.4 Header Sanitization
        const safeHeaders = {};
        Object.entries(headers).forEach(([key, value]) => {
            if (!BLOCKED_HEADERS.includes(key.toLowerCase())) {
                safeHeaders[key] = value;
            }
        });

        // 4.5 Prepare Request
        // Note: GET/HEAD methods cannot have a body
        const hasBody = !['GET', 'HEAD'].includes(method.toUpperCase());
        const fetchOptions = {
            method: method.toUpperCase(),
            headers: safeHeaders,
            body: hasBody && data ? JSON.stringify(data) : undefined,
            // Timeout control (optional advanced feature, defaulting standard fetch behavior for now)
            redirect: 'follow',
        };

        // 4.6 Execute Request
        const response = await fetch(url, fetchOptions);
        const endTime = Date.now();
        const executionTime = endTime - startTime;

        // 4.7 Handle Response Body
        let responseData;
        const contentType = response.headers.get('content-type');

        try {
            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }
        } catch (err) {
            responseData = '[Non-JSON or Empty Response]';
        }

        // 4.8 Extract Response Headers
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value;
        });

        // 4.9 Return Standardized Success Response
        return NextResponse.json(
            {
                success: response.ok,
                status: response.status,
                statusText: response.statusText,
                time: `${executionTime}ms`,
                request: {
                    url,
                    method,
                    headers: safeHeaders, // Echo back what was sent (sanitized)
                },
                response: {
                    headers: responseHeaders,
                    body: responseData,
                }
            },
            { status: 200, headers: corsHeaders } // Always return 200 from proxy, actual status is in the payload
        );

    } catch (error) {
        console.error('[API Proxy Error]:', error);

        return NextResponse.json(
            {
                success: false,
                status: 500,
                error: error.message || 'Internal Server Error',
                time: `${Date.now() - startTime}ms`,
            },
            { status: 500, headers: corsHeaders }
        );
    }
}
