import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const post = await db.select().from(blogPosts).where(eq(blogPosts.id, parseInt((await params).id)));
    if (!post.length) return new NextResponse('Not Found', { status: 404, headers: corsHeaders });
    return NextResponse.json(post[0], { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500, headers: corsHeaders });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401 });
  const body = await req.json();
  const updated = await db.update(blogPosts).set(body).where(eq(blogPosts.id, parseInt((await params).id))).returning();
  return NextResponse.json(updated[0]);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401 });
  await db.delete(blogPosts).where(eq(blogPosts.id, parseInt((await params).id)));
  return new NextResponse(null, { status: 204 });
}

