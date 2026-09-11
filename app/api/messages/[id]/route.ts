import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactMessages } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

const ALLOWED_ORIGINS = ['https://mtaanimation.com','https://www.mtaanimation.com','http://localhost:5173','http://localhost:3001'];
function getCorsHeaders(origin: string | null) {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return { 'Access-Control-Allow-Origin': allowedOrigin, 'Access-Control-Allow-Methods': 'PATCH, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Vary': 'Origin' };
}
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(req.headers.get('origin')) });
}
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const origin = req.headers.get('origin');
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401, headers: getCorsHeaders(origin) });
  const body = await req.json();
  const updated = await db.update(contactMessages).set({ read: body.read }).where(eq(contactMessages.id, Number(params.id))).returning();
  return NextResponse.json(updated[0], { headers: getCorsHeaders(origin) });
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const origin = req.headers.get('origin');
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401, headers: getCorsHeaders(origin) });
  await db.delete(contactMessages).where(eq(contactMessages.id, Number(params.id)));
  return NextResponse.json({ success: true }, { headers: getCorsHeaders(origin) });
}