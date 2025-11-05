import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price)
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(
  price: number,
  compareAtPrice: number
): number {
  if (compareAtPrice <= price) return 0
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
}

/**
 * Format stock status
 */
export function getStockStatus(stock: number): {
  status: "in-stock" | "low-stock" | "out-of-stock"
  label: string
  color: string
} {
  if (stock === 0) {
    return {
      status: "out-of-stock",
      label: "Out of Stock",
      color: "text-red-600",
    }
  }
  if (stock <= 5) {
    return {
      status: "low-stock",
      label: `Only ${stock} left`,
      color: "text-amber-600",
    }
  }
  return {
    status: "in-stock",
    label: "In Stock",
    color: "text-emerald-600",
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}

/**
 * Generate slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim()
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Check if value is empty
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true
  if (typeof value === "string") return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === "object") return Object.keys(value).length === 0
  return false
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}
