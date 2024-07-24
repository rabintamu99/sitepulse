'use server'

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function getFetchedWebsites() {
  const session = await auth();
  console.log("session", session);
  const fetchedWebsites = await prisma.website.findMany({
    where: {
      userId: session?.user?.id,
    },
    });
    // console.log("fetchedWebsites", fetchedWebsites);
    return fetchedWebsites;
}
