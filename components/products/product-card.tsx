"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { Product } from "@/lib/types"
import { formatPrice, calculateDiscount, getStockStatus } from "@/lib/utils"
import { BADGE_CONFIG } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { urlFor } from "@/lib/sanity/image"

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onToggleWishlist?: (productId: string) => void
  isInWishlist?: boolean
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
}: ProductCardProps) {
  const stockStatus = getStockStatus(product.stock)
  const discount = product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : 0

  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(400).height(400).url()
    : "/placeholder-product.jpg"

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Badges */}
      <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
        {product.badges?.map((badge) => {
          const config = BADGE_CONFIG[badge]
          return (
            <Badge
              key={badge}
              className={config.color}
              variant="default"
            >
              {config.icon} {config.label}
            </Badge>
          )
        })}
        {discount > 0 && (
          <Badge className="bg-red-500 text-white">
            -{discount}%
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => onToggleWishlist?.(product._id)}
        className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-2 shadow-md transition-all hover:bg-white hover:scale-110"
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={`h-4 w-4 ${
            isInWishlist
              ? "fill-red-500 text-red-500"
              : "text-gray-600"
          }`}
        />
      </button>

      <CardHeader className="p-0">
        <Link href={`/product/${product.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Out of stock overlay */}
            {stockStatus.status === "out-of-stock" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="text-lg font-semibold text-white">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-4">
        <Link href={`/product/${product.slug}`}>
          {/* Category */}
          {product.category && (
            <p className="text-xs text-gray-500 mb-1">
              {product.category.name}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <p className={`text-xs font-medium ${stockStatus.color}`}>
            {stockStatus.label}
          </p>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAddToCart?.(product)}
          disabled={stockStatus.status === "out-of-stock"}
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
