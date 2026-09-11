import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactMessages } from '@/lib/schema';
import { desc } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

// Public POST uses wildcard so any origin can submit the contact form
const PUBLIC_CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const ALLOWED_ORIGINS = [
  'https://mtaanimation.com',
  'https://www.mtaanimation.com',
  'http://localhost:5173',
  'http://localhost:3001',
];

function getAdminCors(origin: string | null) {
  const allowedOrigin = (origin && ALLOWED_ORIGINS.includes(origin)) ? origin : 'https://www.mtaanimation.com';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Vary': 'Origin',
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: PUBLIC_CORS });
}

// GET - admin only
export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401, headers: getAdminCors(origin) });
  try {
    const messages = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
    return NextResponse.json(messages, { headers: getAdminCors(origin) });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500, headers: getAdminCors(origin) });
  }
}

// POST - public contact form submission
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400, headers: PUBLIC_CORS });
    }
    const newMsg = await db.insert(contactMessages).values({ name, email, subject, message }).returning();
    return NextResponse.json(newMsg[0], { status: 201, headers: PUBLIC_CORS });
  } catch {
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500, headers: PUBLIC_CORS });
  }
}