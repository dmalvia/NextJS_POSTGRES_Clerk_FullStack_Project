import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { syncCurrentUser } from "@/lib/sync-user";

export async function POST(request: NextRequest) {
  try {
    // Sync user from Clerk to database
    const dbUser = await syncCurrentUser();
    if (!dbUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await request.json();

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    // Check if vote already exists
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          userId: dbUser.id,
          postId,
        },
      },
    });

    if (existingVote) {
      // Remove vote (toggle)
      await prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      });
      return NextResponse.json({ voted: false });
    } else {
      // Add vote
      await prisma.vote.create({
        data: {
          userId: dbUser.id,
          postId,
        },
      });
      return NextResponse.json({ voted: true });
    }
  } catch (error) {
    console.error("Error toggling vote:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
