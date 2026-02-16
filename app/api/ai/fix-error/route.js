
import { generateErrorSolution } from '@/lib/ai/gemini';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ErrorPost from '@/lib/models/ErrorPost';
import UserQuery from '@/lib/models/UserQuery';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const { error } = await request.json();

        if (!error) {
            return NextResponse.json({ error: 'Error message is required.' }, { status: 400 });
        }

        // 1. Generate Solution
        const solution = await generateErrorSolution(error);

        // 2. Save to DB (UserQuery + Draft Post)
        try {
            await dbConnect();

            // Log the query
            const userQuery = await UserQuery.create({
                rawErrorInput: error,
                aiResponse: solution,
                savedAsPost: true
            });

            // Create Draft Post
            // We use a slug strategy: title-timestamp to avoid duplicates initially
            const slugBase = solution.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            const slug = `${slugBase}-${Date.now()}`;

            const newPost = await ErrorPost.create({
                title: solution.title,
                errorText: error,
                aiFixExplanation: JSON.stringify(solution.fix), // Storing specific part or full JSON? 
                // The schema expects a string for aiFixExplanation. 
                // solution.fix is likely a string based on Gemini prompt.
                // Let's store the whole solution object in a flexible way or map fields.
                // Re-reading Schema: aiFixExplanation is String. 
                // Gemini returns { title, summary, rootCause, fix ... }
                // Let's map accurately.
                aiFixExplanation: solution.fix,
                humanizedContent: `## Summary\n${solution.summary}\n\n## Root Cause\n${solution.rootCause}\n\n## Fix\n${solution.fix}\n\n## Prevention\n${solution.prevention}`,
                language: 'General', // We could try to detect or use AI to guess, but default is safer for now.
                tags: solution.related || [],
                category: 'Uncategorized',
                slug: slug,
                status: 'draft',
                views: 0
            });

            console.log(`Draft created: ${newPost._id}`);

        } catch (dbError) {
            console.error("Failed to save draft:", dbError);
            // Non-blocking
        }

        return NextResponse.json(solution);
    } catch (err) {
        return NextResponse.json(
            { error: err.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
