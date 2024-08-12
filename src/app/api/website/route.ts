import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const websites = await prisma.website.findMany({
      include: {
        metrics: true
      }
    });
    return NextResponse.json(websites);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch websites' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
