import { NextResponse } from 'next/server';

export async function GET() {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        return NextResponse.json({
            status: 'error',
            message: '❌ MONGODB_URI is NOT set in environment variables',
            fix: 'Go to Vercel Dashboard → Project → Settings → Environment Variables → Add MONGODB_URI',
        }, { status: 500 });
    }

    try {
        const { MongoClient } = await import('mongodb');
        const client = new MongoClient(mongoUri, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 8000,
        });
        await client.connect();
        await client.db('sarvam_db').command({ ping: 1 });
        await client.close();

        return NextResponse.json({
            status: 'ok',
            message: '✅ MongoDB Atlas connected successfully!',
            database: 'sarvam_db',
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: '❌ MongoDB connection failed',
            error: error.message,
            possibleFixes: [
                '1. Whitelist 0.0.0.0/0 in MongoDB Atlas → Network Access → Add IP Address',
                '2. Make sure MONGODB_URI is correct in Vercel environment variables',
                '3. Check your MongoDB Atlas cluster is running (not paused)',
            ],
        }, { status: 500 });
    }
}
