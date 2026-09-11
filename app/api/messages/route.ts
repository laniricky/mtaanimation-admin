import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactMessages } from '@/lib/schema';
import { desc } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

const ALLOWED_ORIGINS = [
  'https://mtaanimation.com',
  'https://www.mtaanimation.com',
  'http://localhost:5173',
  'http://localhost:3001',
];

function getCorsHeaders(origin: string | null) {
  const allowedOrigin = (origin && ALLOWED_ORIGINS.includes(origin)) ? origin : 'https://www.mtaanimation.com';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(origin) });
}

// GET - admin only: list all messages
export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401, headers: getCorsHeaders(origin) });
  try {
    const messages = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
    return NextResponse.json(messages, { headers: getCorsHeaders(origin) });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500, headers: getCorsHeaders(origin) });
  }
}

// POST - public: submit a contact message
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400, headers: getCorsHeaders(origin) });
    }
    const newMsg = await db.insert(contactMessages).values({ name, email, subject, message }).returning();
    return NextResponse.json(newMsg[0], { status: 201, headers: getCorsHeaders(origin) });
  } catch {
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500, headers: getCorsHeaders(origin) });
  }
}