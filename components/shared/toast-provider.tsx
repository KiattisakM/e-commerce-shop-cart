"use client"

import { Toaster } from "sonner"

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      toastOptions={{
        duration: 3000,
        style: {
          background: "white",
          border: "1px solid #e5e7eb",
        },
        classNames: {
          error: "border-red-500",
          success: "border-emerald-500",
          warning: "border-amber-500",
          info: "border-blue-500",
        },
      }}
    />
  )
}
