"use client"

import Image from "next/image"
import Link from "next/link"
import { Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { useCartStore } from "@/lib/store/cart-store"
import { formatPrice } from "@/lib/utils"
import { urlFor } from "@/lib/sanity/image"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, subtotal, itemCount, incrementItem, decrementItem, removeItem } =
    useCartStore()

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart
            {itemCount > 0 && (
              <span className="text-sm font-normal text-gray-500">
                ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8">
            <div className="rounded-full bg-gray-100 p-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Your cart is empty
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Add items to get started
              </p>
            </div>
            <Button onClick={onClose} variant="default">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => {
                  const imageUrl = item.product.images?.[0]
                    ? urlFor(item.product.images[0])
                        .width(200)
                        .height(200)
                        .url()
                    : "/placeholder-product.jpg"

                  return (
                    <div
                      key={item.product._id}
                      className="flex gap-4 rounded-lg border p-3"
                    >
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={onClose}
                        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100"
                      >
                        <Image
                          src={imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </Link>

                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={onClose}
                            className="text-sm font-medium text-gray-900 hover:text-emerald-600 line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.product._id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {item.product.category && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item.product.category.name}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-auto pt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => decrementItem(item.product._id)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => incrementItem(item.product._id)}
                              disabled={item.quantity >= item.product.stock}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <span className="text-sm font-semibold text-gray-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping & taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <Link href="/checkout" onClick={onClose}>
                    Checkout
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
