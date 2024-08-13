'use server'

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getFetchedWebsites() {
  const session = await auth();
  console.log("Session:", session); // Add this line to check the session
  const fetchedWebsites = await prisma.website.findMany({
    where: {
      userId: session?.user?.id,
    },
  });
    console.log("fetchedWebsites", fetchedWebsites);
    return fetchedWebsites;
}

export async function g() {
  const session = await auth();
  const fetchedWebsites = await prisma.website.findMany({
    where: {
      userId: session?.user?.id,
    },
  });
    // console.log("fetchedWebsites", fetchedWebsites);
    return fetchedWebsites;
}

export async function deleteMonitor(id: string) {
  const session = await auth();
  const userId = session?.user?.id;

  // Verify the user owns the website
  const website = await prisma.website.findFirst({
    where: {
      id: parseInt(id),
      userId: userId,
    },
  });

  if (!website) {
    throw new Error("Website not found or you do not have permission to delete it.");
  }

  // Delete related metrics
  await prisma.metric.deleteMany({
    where: {
      websiteId: parseInt(id),
    },
  });

  // Delete the website
  await prisma.website.delete({
    where: {
      id: parseInt(id),
    },
  });
}