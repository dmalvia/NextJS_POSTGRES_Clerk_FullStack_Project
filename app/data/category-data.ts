import { Bug, Lightbulb, Palette, Sparkle, Wrench } from "lucide-react";

const CATEGORIES = {
  Feature: {
    bg: "bg-gradient-to-br from-blue-500 to-blue-600",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
    light: "bg-blue-50 dark:bg-blue-900/30",
    icon: Sparkle,
  },
  Improvement: {
    bg: "bg-gradient-to-br from-green-500 to-green-600",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
    light: "bg-green-50 dark:bg-green-900/30",
    icon: Wrench,
  },
  Bug: {
    bg: "bg-gradient-to-br from-red-500 to-red-600",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-200 dark:border-red-800",
    light: "bg-red-50 dark:bg-red-900/30",
    icon: Bug,
  },
  Design: {
    bg: "bg-gradient-to-br from-purple-500 to-purple-600",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800",
    light: "bg-purple-50 dark:bg-purple-900/30",
    icon: Palette,
  },
  Other: {
    bg: "bg-gradient-to-br from-gray-500 to-gray-600",
    text: "text-gray-600 dark:text-gray-400",
    border: "border-gray-200 dark:border-gray-800",
    light: "bg-gray-50 dark:bg-gray-900/30",
    icon: Lightbulb,
  },
} as const;

export type CategoryType = keyof typeof CATEGORIES;

export function getCategoryDesign(
  category: string
): (typeof CATEGORIES)[keyof typeof CATEGORIES] {
  const key = category as CategoryType;
  return CATEGORIES[key] || CATEGORIES.Other;
}
