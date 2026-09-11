import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { desc } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

const ALLOWED_ORIGINS = [
  'https://mtaanimation.com',
  'https://www.mtaanimation.com',
  'http://localhost:5173',
  'http://localhost:3001',
];

function getCorsHeaders(origin: string | null) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(origin) });
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.id));
    return NextResponse.json(posts, { headers: getCorsHeaders(origin) });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500, headers: getCorsHeaders(origin) });
  }
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401, headers: getCorsHeaders(origin) });
  const body = await req.json();
  const newPost = await db.insert(blogPosts).values(body).returning();
  return NextResponse.json(newPost[0], { headers: getCorsHeaders(origin) });
}