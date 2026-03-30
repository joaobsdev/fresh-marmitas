"use client"

import Image from "next/image"
import { Minus, Plus, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Meal {
  id: string
  name: string
  description: string
  price: number
  image: string
  tags: string[]
}

interface MealCardProps {
  meal: Meal
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  onSelect: () => void
}

export function MealCard({
  meal,
  quantity,
  onIncrement,
  onDecrement,
  onSelect,
}: MealCardProps) {
  const isSelected = quantity > 0

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect()
        }
      }}
      className={cn(
        "group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-lg border-2 bg-card text-left transition-all duration-300",
        isSelected
          ? "border-primary shadow-lg shadow-primary/10"
          : "border-transparent shadow-md hover:shadow-lg hover:-translate-y-0.5"
      )}
    >
      {isSelected && (
        <div className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-primary shadow-md">
          <Check className="h-4 w-4 text-primary-foreground" />
        </div>
      )}

      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={meal.image}
          alt={meal.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {meal.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-serif text-lg text-card-foreground">
          {meal.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {meal.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-xl font-bold text-primary">
            R$ {meal.price.toFixed(2).replace(".", ",")}
          </span>

          {isSelected && (
            <div
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={onDecrement}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
                aria-label="Diminuir quantidade"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-bold text-foreground">
                {quantity}
              </span>
              <button
                type="button"
                onClick={onIncrement}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                aria-label="Aumentar quantidade"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
