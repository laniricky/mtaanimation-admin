import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { episodes } from '@/lib/schema';
import { auth } from '@clerk/nextjs/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mtaanimation.com',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    const allEpisodes = await db.select().from(episodes);
    return NextResponse.json(allEpisodes, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return NextResponse.json({ error: 'Failed to fetch episodes' }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const newEpisode = await db.insert(episodes).values(body).returning();
    
    return NextResponse.json(newEpisode[0]);
  } catch (error) {
    console.error('Error creating episode:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

