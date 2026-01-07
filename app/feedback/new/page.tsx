"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES = ["Feature", "Improvement", "Bug", "Design", "Other"];

// Server action function
async function submitFeedback(
  prevState: { success: boolean; error: string },
  formData: FormData
) {
  // Show loading toast
  const loadingToast = toast.loading("Submitting your feedback...");

  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    // Dismiss loading toast and show success
    toast.dismiss(loadingToast);
    toast.success("Your feedback has been submitted successfully!");

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    console.error("Something went wrong. Please try again.", error);

    // Dismiss loading toast and show error
    toast.dismiss(loadingToast);
    toast.error("Something went wrong. Please try again.");

    return {
      success: false,
      error: "Failed to submit feedback",
    };
  }
}

export default function NewFeedbackPage() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(submitFeedback, {
    success: false,
    error: "",
  });

  // Redirect on success
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/feedback");
        router.refresh();
      }, 1500); // Wait for toast to be visible
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/feedback">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Share Your Feedback</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>New Feedback</CardTitle>
          <CardDescription>
            Share your idea with the community. Be specific about what you'd
            like to see.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="What would you like to see ?"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                className="w-full px-3 py-2 border rounded-md bg-background"
                defaultValue={CATEGORIES[0]}
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your idea in detail..."
                rows={6}
                required
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Feedback"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/feedback">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
