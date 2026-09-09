import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse('Unauthorized', { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) return new NextResponse('No file provided', { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString('base64');
  const dataUri = `data:${file.type};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: 'mtaanimation',
    resource_type: 'auto',
  });

  return NextResponse.json({ url: result.secure_url, publicId: result.public_id });
}

