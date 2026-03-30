"use client"

import { ShoppingCart, Plus, Minus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { Meal } from "@/components/meal-card"
import Image from "next/image"

interface CartItem {
  meal: Meal
  quantity: number
}

interface CartSheetProps {
  items: CartItem[]
  onIncrement: (mealId: string) => void
  onDecrement: (mealId: string) => void
  onRemove: (mealId: string) => void
}

export function CartSheet({
  items,
  onIncrement,
  onDecrement,
  onRemove,
}: CartSheetProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.meal.price * item.quantity,
    0
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-full hover:bg-primary/10"
        >
          <ShoppingCart className="h-5 w-5 text-foreground" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Abrir carrinho</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-serif text-xl">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Seu Carrinho
          </SheetTitle>
          <SheetDescription className="sr-only">
            Itens selecionados e total do pedido.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Seu carrinho esta vazio</p>
            <p className="text-sm text-muted-foreground">
              Adicione marmitas para comecar!
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="flex flex-col gap-4">
                {items.map(({ meal, quantity }) => (
                  <li
                    key={meal.id}
                    className="flex gap-3 rounded-lg border border-border bg-card p-3"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={meal.image}
                        alt={meal.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium leading-tight text-foreground">
                          {meal.name}
                        </h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={() => onRemove(meal.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remover item</span>
                        </Button>
                      </div>
                      <p className="text-sm font-semibold text-primary">
                        R$ {meal.price.toFixed(2).replace(".", ",")}
                      </p>
                      <div className="mt-auto flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onDecrement(meal.id)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Diminuir quantidade</span>
                        </Button>
                        <span className="w-6 text-center text-sm font-medium text-foreground">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onIncrement(meal.id)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Aumentar quantidade</span>
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="text-xl font-bold text-foreground">
                  R$ {totalPrice.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Role para baixo na pagina para finalizar o pedido
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
