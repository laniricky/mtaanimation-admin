import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { episodes } from '@/lib/schema';
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

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const episode = await db.select().from(episodes).where(eq(episodes.id, parseInt(params.id)));
    if (!episode.length) return new NextResponse('Not Found', { status: 404, headers: corsHeaders });
    return NextResponse.json(episode[0], { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch episode' }, { status: 500, headers: corsHeaders });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });
    const body = await req.json();
    const updated = await db.update(episodes).set(body).where(eq(episodes.id, parseInt(params.id))).returning();
    return NextResponse.json(updated[0]);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });
    await db.delete(episodes).where(eq(episodes.id, parseInt(params.id)));
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

