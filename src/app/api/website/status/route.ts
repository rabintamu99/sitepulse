import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export async function POST() {
  try {
    const websites = await prisma.website.findMany();
    const statusPromises = websites.map(async (website) => {
      try {
        const response = await axios.get(website.url);
        await prisma.website.update({
          where: { id: Number(website.id) },
          data: { status: response.status },
        });
        return { ...website, status: response.status };
      } catch (error: any) {
        const statusCode = error.response ? error.response.status : 500;
        await prisma.website.update({
          where: { id: Number(website.id) },
          data: { status: statusCode },
        });
        return { ...website, status: statusCode };
      }
    });

    const websitesWithStatus = await Promise.all(statusPromises);
    return NextResponse.json(websitesWithStatus);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update websites status' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}