import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(num: number): string {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + "Cr"
  } else if (num >= 100000) {
    return (num / 100000).toFixed(1) + "L"
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

export function formatPercentage(percent: number): string {
  return `${percent >= 0 ? "+" : ""}${percent.toFixed(2)}%`
}
