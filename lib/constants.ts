/**
 * Application Constants
 */

// Site Configuration
export const SITE_CONFIG = {
  name: "ShopCart",
  description: "Modern e-commerce shopping experience",
  url: "https://shopcart.example.com",
  author: "ShopCart Team",
} as const

// Navigation Links
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/shop?view=categories" },
  { label: "New Arrivals", href: "/shop?filter=new" },
  { label: "Sale", href: "/shop?filter=sale" },
] as const

// Badge Types and Colors
export const BADGE_CONFIG = {
  sale: {
    label: "Sale",
    color: "bg-red-500 text-white",
    icon: "🔥",
  },
  new: {
    label: "New",
    color: "bg-emerald-500 text-white",
    icon: "✨",
  },
  hot: {
    label: "Hot",
    color: "bg-orange-500 text-white",
    icon: "🔥",
  },
  lowstock: {
    label: "Low Stock",
    color: "bg-amber-500 text-white",
    icon: "⚠️",
  },
} as const

// Sort Options
export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
] as const

// Price Range Filters
export const PRICE_RANGES = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 to $50", min: 25, max: 50 },
  { label: "$50 to $100", min: 50, max: 100 },
  { label: "$100 to $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
] as const

// Pagination
export const PAGINATION = {
  defaultPageSize: 12,
  pageSizeOptions: [12, 24, 36, 48],
} as const

// Cart Settings
export const CART_CONFIG = {
  maxQuantity: 99,
  minQuantity: 1,
  storageKey: "shopcart-cart",
} as const

// Checkout Steps
export const CHECKOUT_STEPS = [
  { id: "information", label: "Information", icon: "user" },
  { id: "shipping", label: "Shipping", icon: "truck" },
  { id: "payment", label: "Payment", icon: "credit-card" },
] as const

// Shipping Options
export const SHIPPING_OPTIONS = [
  {
    id: "standard",
    label: "Standard Shipping",
    description: "5-7 business days",
    price: 0,
  },
  {
    id: "express",
    label: "Express Shipping",
    description: "2-3 business days",
    price: 15,
  },
  {
    id: "overnight",
    label: "Overnight Shipping",
    description: "Next business day",
    price: 30,
  },
] as const

// Payment Methods
export const PAYMENT_METHODS = [
  { id: "card", label: "Credit/Debit Card", icon: "credit-card" },
  { id: "paypal", label: "PayPal", icon: "paypal" },
  { id: "apple-pay", label: "Apple Pay", icon: "apple" },
  { id: "google-pay", label: "Google Pay", icon: "google" },
] as const

// Social Proof Messages
export const SOCIAL_PROOF = [
  "50,000+ Happy Customers",
  "Free Shipping on Orders $50+",
  "24/7 Customer Support",
  "30-Day Money Back Guarantee",
  "Secure Payment Processing",
] as const

// Service Guarantees
export const SERVICE_GUARANTEES = [
  {
    icon: "shield-check",
    title: "Secure Payments",
    description: "100% secure transactions",
  },
  {
    icon: "truck",
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: "refresh-cw",
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: "headphones",
    title: "24/7 Support",
    description: "Dedicated customer service",
  },
] as const

// Keyboard Shortcuts
export const KEYBOARD_SHORTCUTS = {
  search: { key: "k", label: "Search Products", modifiers: ["cmd", "ctrl"] },
  cart: { key: "b", label: "View Cart", modifiers: ["cmd", "ctrl"] },
  wishlist: { key: "w", label: "View Wishlist", modifiers: ["cmd", "ctrl"] },
  checkout: { key: "enter", label: "Quick Checkout", modifiers: ["cmd", "ctrl"] },
} as const

// Animation Durations
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const

// Breakpoints (match Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

// Image Sizes
export const IMAGE_SIZES = {
  thumbnail: { width: 100, height: 100 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 600 },
  large: { width: 1200, height: 1200 },
} as const

// API Configuration
export const API_CONFIG = {
  revalidate: 3600, // 1 hour
  maxRetries: 3,
  timeout: 10000, // 10 seconds
} as const
