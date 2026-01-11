import { GradientHeader } from "@/components/gradient-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, BarChart, MessageSquare, Users, Zap } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <GradientHeader
        title="Shape the future of our products"
        subtitle="Feedback Fusion is where your ideas come to life. Suggest features, vote on what matters most, and follow our public roadmap."
      >
        <div className="flex gap-4 justify-center pt-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Link href="/feedback/new">
              Submit Feedback
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-white text-black hover:bg-gray-100"
          >
            <Link href="/roadmap">View Roadmap</Link>
          </Button>
        </div>
      </GradientHeader>

      {/* Feature Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <MessageSquare className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Submit Ideas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Share your suggestions and feature requests with the community.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <BarChart className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Vote & Prioritize</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Upvote ideas you love to help us understand what matters most.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Follow our public roadmap to see what we&#39;re working on next.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle>See Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Watch as your feedback transforms into real features and
                improvements.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="text-center">
        <div className="inline-grid grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold">1,234+</div>
            <div className="text-muted-foreground">Suggestion</div>
          </div>
          <div>
            <div className="text-3xl font-bold">8,901+</div>
            <div className="text-muted-foreground">Votes Cast</div>
          </div>
          <div>
            <div className="text-3xl font-bold">256+</div>
            <div className="text-muted-foreground">Features Shipped</div>
          </div>
        </div>
      </section>
    </div>
  );
}
