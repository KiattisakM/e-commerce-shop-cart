"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { NAV_LINKS } from "@/lib/constants"

interface HeaderProps {
  cartItemCount?: number
  wishlistItemCount?: number
  onOpenCart?: () => void
  onOpenWishlist?: () => void
  onOpenSearch?: () => void
}

export function Header({
  cartItemCount = 0,
  wishlistItemCount = 0,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ShopCart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-emerald-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-4"
                onClick={onOpenSearch}
                readOnly
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-600 opacity-100 lg:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onOpenSearch}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onOpenWishlist}
              aria-label="Wishlist"
              className="relative"
            >
              <Heart className="h-5 w-5" />
              {wishlistItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {wishlistItemCount > 9 ? "9+" : wishlistItemCount}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="default"
              size="icon"
              onClick={onOpenCart}
              aria-label="Shopping cart"
              className="relative bg-emerald-600 hover:bg-emerald-700"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="border-t py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-emerald-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>

      {/* Trust Bar */}
      <div className="border-t bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-center gap-8 overflow-x-auto text-xs text-gray-600">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="font-medium">50K+</span> Happy Customers
            </div>
            <div className="hidden sm:block">•</div>
            <div className="hidden sm:flex items-center gap-1 whitespace-nowrap">
              Free Shipping $50+
            </div>
            <div className="hidden md:block">•</div>
            <div className="hidden md:flex items-center gap-1 whitespace-nowrap">
              24/7 Support
            </div>
            <div className="hidden lg:block">•</div>
            <div className="hidden lg:flex items-center gap-1 whitespace-nowrap">
              30-Day Returns
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
