
import { generateErrorSolution } from '@/lib/ai/gemini';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Draft from '@/lib/models/Draft';

export async function POST(request) {
    try {
        const { error } = await request.json();

        if (!error) {
            return NextResponse.json({ error: 'Error message is required.' }, { status: 400 });
        }

        // 1. Generate Solution
        const solution = await generateErrorSolution(error);

        // 2. Save to DB (Fire and Forget / Resilient)
        try {
            if (process.env.MONGODB_URI) {
                await dbConnect();
                await Draft.create({
                    title: solution.title,
                    error: error,
                    solution: solution,
                    status: 'draft'
                });
            } else {
                console.warn("MONGODB_URI missing. Draft not saved.");
            }
        } catch (dbError) {
            console.error("Failed to save draft:", dbError);
            // Non-blocking: continue to return solution to user
        }

        return NextResponse.json(solution);
    } catch (err) {
        return NextResponse.json(
            { error: err.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
