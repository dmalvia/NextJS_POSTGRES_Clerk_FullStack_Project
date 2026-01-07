import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, BarChart3, Users, Target } from "lucide-react";
import prisma from "@/lib/prisma";
import { STATUS_ORDER, STATUS_GROUPS } from "../data/status-data";
import { Progress } from "@/components/ui/progress";
import { GradientHeader } from "@/components/gradient-header";

export const dynamic = "force-dynamic";

function getStatusPercentage(posts: any[], status: string) {
  const total = posts.length;
  const count = posts.filter((p) => p.status === status).length;
  return total > 0 ? Math.round((count / total) * 100) : 0;
}

export default async function RoadmapPage() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      votes: true,
    },
    orderBy: {
      votes: {
        _count: "desc",
      },
    },
  });

  const groupedPosts = {
    under_review: posts.filter((p) => p.status === "under_review"),
    planned: posts.filter((p) => p.status === "planned"),
    in_progress: posts.filter((p) => p.status === "in_progress"),
    completed: posts.filter((p) => p.status === "completed"),
  };

  const totalVotes = posts.reduce((acc, post) => acc + post.votes.length, 0);
  const averageVotes =
    posts.length > 0 ? Math.round(totalVotes / posts.length) : 0;

  // Calculate progress for the overall roadmap
  const completedPercentage = getStatusPercentage(posts, "completed");
  const inProgressPercentage = getStatusPercentage(posts, "in_progress");
  const plannedPercentage = getStatusPercentage(posts, "planned");

  return (
    <div className="space-y-8">
      <GradientHeader
        title="Product Roadmap"
        subtitle="See what we're working on, what's coming next, and track our
            progress"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Features</p>
                <p className="text-3xl font-bold">{posts.length}</p>
              </div>
              <Target className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Votes</p>
                <p className="text-3xl font-bold">{totalVotes}</p>
              </div>
              <BarChart3 className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold">
                  {groupedPosts.completed.length}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Avg. Votes/Feature
                </p>
                <p className="text-3xl font-bold">{averageVotes}</p>
              </div>
              <Users className="h-10 w-10 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Roadmap Progress</CardTitle>
          <CardDescription>
            Track the journey from idea to completion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Completion</span>
              <span className="font-medium">{completedPercentage}%</span>
            </div>
            <Progress value={completedPercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {inProgressPercentage}%
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {plannedPercentage}%
              </div>
              <div className="text-sm text-muted-foreground">Planned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {completedPercentage}%
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roadmap Columns*/}
      <div className="lg:grid grid-cols-1 lg:grid-cols-4 gap-6">
        {STATUS_ORDER.map((status) => {
          const group = STATUS_GROUPS[status as keyof typeof STATUS_GROUPS];
          const Icon = group.icon;
          const postsInGroup =
            groupedPosts[status as keyof typeof groupedPosts];

          return (
            <div key={status} className="space-y-4">
              <div
                className={`rounded-lg p-4 ${group.bgColor} border ${group.color}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${group.textColor}`} />
                    <h2 className={`text-lg font-semibold ${group.textColor}`}>
                      {group.title}
                    </h2>
                  </div>
                  <Badge variant="secondary" className={group.countColor}>
                    {postsInGroup.length}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {group.description}
                </p>
              </div>

              <div className="space-y-3">
                {postsInGroup.map((post) => (
                  <Card
                    key={post.id}
                    className={`border-l-4 ${group.color} hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {post.author.name} • {post.votes.length} votes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        {status === "in_progress" && (
                          <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
                            <Clock className="h-3 w-3" />
                            Active
                          </div>
                        )}
                        {status === "completed" && (
                          <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                            <CheckCircle className="h-3 w-3" />
                            Shipped
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {postsInGroup.length === 0 && (
                  <Card className="border-dashed opacity-50">
                    <CardContent className="py-8 text-center">
                      <p className="text-sm text-muted-foreground">
                        No items in this stage
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Roadmap Legend</CardTitle>
          <CardDescription>Understanding the status indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATUS_ORDER.map((status) => {
              const group = STATUS_GROUPS[status as keyof typeof STATUS_GROUPS];
              const Icon = group.icon;

              return (
                <div key={status} className="flex items-center gap-3">
                  <div
                    className={`h-3 w-3 rounded-full border-2 ${group.color.replace(
                      "border-",
                      "border-"
                    )}`}
                  />
                  <div>
                    <p className="font-medium text-sm">{group.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {group.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
