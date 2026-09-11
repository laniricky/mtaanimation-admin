import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { episodes } from '@/lib/schema';
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
    const allEpisodes = await db.select().from(episodes).orderBy(desc(episodes.id));
    return NextResponse.json(allEpisodes, { headers: getCorsHeaders(origin) });
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return NextResponse.json({ error: 'Failed to fetch episodes' }, { status: 500, headers: getCorsHeaders(origin) });
  }
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401, headers: getCorsHeaders(origin) });
    const body = await req.json();
    const newEpisode = await db.insert(episodes).values(body).returning();
    return NextResponse.json(newEpisode[0], { headers: getCorsHeaders(origin) });
  } catch (error) {
    console.error('Error creating episode:', error);
    return new NextResponse('Internal Error', { status: 500, headers: getCorsHeaders(origin) });
  }
}