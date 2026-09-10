import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { characters } from '@/lib/schema';
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
    const allCharacters = await db.select().from(characters);
    return NextResponse.json(allCharacters, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch characters' }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });
    const body = await req.json();
    const newChar = await db.insert(characters).values(body).returning();
    return NextResponse.json(newChar[0]);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

