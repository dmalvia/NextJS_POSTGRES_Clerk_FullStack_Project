import {
  PrismaClient,
  Prisma,
  Role,
  PostStatus,
} from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed users
  const user1 = await prisma.user.create({
    data: {
      clerkUserId: "clerk_001",
      email: "user1@example.com",
      name: "User One",
      image: "https://i.pravatar.cc/150?img=1",
      role: Role.user,
    },
  });

  const admin = await prisma.user.create({
    data: {
      clerkUserId: "clerk_002",
      email: "admin@example.com",
      name: "Admin User",
      image: "https://i.pravatar.cc/150?img=2",
      role: Role.admin,
    },
  });

  // Seed posts
  await prisma.post.create({
    data: {
      title: "First Feedback",
      description: "This is the first feedback post.",
      category: "General",
      status: PostStatus.under_review,
      authorId: user1.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Feature Request",
      description: "Please add dark mode.",
      category: "Feature",
      status: PostStatus.planned,
      authorId: admin.id,
    },
  });
}

main()
  .then(() => {
    console.log("Seeding complete.");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
