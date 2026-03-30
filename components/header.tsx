"use client"

import Link from "next/link"
import { Leaf, LayoutDashboard } from "lucide-react"
import { CartSheet } from "@/components/cart-sheet"
import type { Meal } from "@/components/meal-card"

interface CartItem {
  meal: Meal
  quantity: number
}

interface HeaderProps {
  cartItems: CartItem[]
  onIncrement: (mealId: string) => void
  onDecrement: (mealId: string) => void
  onRemove: (mealId: string) => void
}

export function Header({
  cartItems,
  onIncrement,
  onDecrement,
  onRemove,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-normal tracking-tight text-foreground">
              Fresh Marmitas
            </h1>
            <p className="text-xs text-muted-foreground">
              Comida saudavel com sabor de casa
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/80"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Painel</span>
          </Link>
          <div className="hidden items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-medium text-primary">
              Aceitando pedidos
            </span>
          </div>

          <CartSheet
            items={cartItems}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onRemove={onRemove}
          />
        </div>
      </div>
    </header>
  )
}
