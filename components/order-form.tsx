"use client"

import { useState } from "react"
import {
  MessageSquare,
  CreditCard,
  Banknote,
  Smartphone,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Meal } from "./meal-card"

interface OrderItem {
  meal: Meal
  quantity: number
}

interface OrderFormProps {
  items: OrderItem[]
  onSubmit: (data: { notes: string; payment: string }) => void
  isSubmitting: boolean
}

const paymentMethods = [
  { id: "entrega", label: "Na entrega", icon: Banknote },
  { id: "pix", label: "PIX", icon: Smartphone },
  { id: "cartao", label: "Cartao", icon: CreditCard },
]

export function OrderForm({ items, onSubmit, isSubmitting }: OrderFormProps) {
  const [notes, setNotes] = useState("")
  const [payment, setPayment] = useState("entrega")

  const total = items.reduce(
    (sum, item) => sum + item.meal.price * item.quantity,
    0
  )

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleSubmit = () => {
    onSubmit({ notes, payment })
  }

  if (items.length === 0) return null

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <h3 className="mb-4 font-serif text-lg text-card-foreground">
          Resumo do pedido
        </h3>
        <div className="space-y-3">
          {items.map(({ meal, quantity }) => (
            <div
              key={meal.id}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-card-foreground">
                {quantity}x {meal.name}
              </span>
              <span className="font-medium text-card-foreground">
                R${" "}
                {(meal.price * quantity).toFixed(2).replace(".", ",")}
              </span>
            </div>
          ))}
          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Total ({totalItems} {totalItems === 1 ? "item" : "itens"})
              </span>
              <span className="text-xl font-bold text-primary">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <label
          htmlFor="order-notes"
          className="mb-3 flex items-center gap-2 font-serif text-lg text-card-foreground"
        >
          <MessageSquare className="h-5 w-5 text-primary" />
          Observacoes
        </label>
        <textarea
          id="order-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ex: menos sal, sem cebola, mais arroz..."
          rows={3}
          className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <h3 className="mb-3 font-serif text-lg text-card-foreground">
          Forma de pagamento
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {paymentMethods.map((method) => {
            const Icon = method.icon
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => setPayment(method.id)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border-2 px-3 py-4 text-center transition-all",
                  payment === method.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{method.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={cn(
          "group relative flex w-full items-center justify-center gap-3 rounded-xl px-8 py-5 text-lg font-bold shadow-lg transition-all duration-300",
          isSubmitting
            ? "bg-primary/70 text-primary-foreground"
            : "bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98]"
        )}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-3">
            <svg
              className="h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Enviando...</span>
          </div>
        ) : (
          <>
            <span>{"Enviar pedido \uD83D\uDCAA"}</span>
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </div>
  )
}
