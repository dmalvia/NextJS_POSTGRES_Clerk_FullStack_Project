import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function syncCurrentUser() {
  try {
    // Get user data from Clerk
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return null;
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress;

    if (!email) {
      throw new Error("User email not found");
    }

    // Check if user exists in database
    let dbUser = await prisma.user.findUnique({
      where: { clerkUserId: clerkUser.id },
    });

    if (dbUser) {
      // Update existing user
      dbUser = await prisma.user.update({
        where: { id: dbUser.id },
        data: {
          email,
          name: `${clerkUser.firstName || ""} ${
            clerkUser.lastName || ""
          }`.trim(),
          image: clerkUser.imageUrl,
        },
      });
    } else {
      // Create a new user in database
      // Check if this is the first user - make them admin

      const userCount = await prisma.user.count();
      const isFirstUser = userCount === 0;

      dbUser = await prisma.user.create({
        data: {
          clerkUserId: clerkUser.id,
          email,
          name: `${clerkUser.firstName} ${clerkUser.lastName}`,
          image: clerkUser.imageUrl,
          role: isFirstUser ? "admin" : "user",
        },
      });
      console.log(`New user created: ${email} with role: ${dbUser.role}`);
    }

    return dbUser;
  } catch (error) {
    console.error("Error syncing user from Clerk:", error);
    throw error;
  }
}
