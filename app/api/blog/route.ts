import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { auth } from '@clerk/nextjs/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    const posts = await db.select().from(blogPosts);
    return NextResponse.json(posts, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401 });
  const body = await req.json();
  const newPost = await db.insert(blogPosts).values(body).returning();
  return NextResponse.json(newPost[0]);
}

