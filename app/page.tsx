"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/header"
import { MealCard, type Meal } from "@/components/meal-card"
import { OrderForm } from "@/components/order-form"
import { SuccessOverlay } from "@/components/success-overlay"
import { UtensilsCrossed } from "lucide-react"

const meals: Meal[] = [
  {
    id: "frango-grelhado",
    name: "Frango Grelhado Fit",
    description:
      "Peito de frango grelhado, arroz branco, feijao preto, couve refogada e farofa crocante.",
    price: 18.9,
    image: "/images/frango-grelhado.jpg",
    tags: ["Proteico", "Popular"],
  },
  {
    id: "carne-legumes",
    name: "Carne com Legumes",
    description:
      "Tiras de carne magra, arroz integral, brocolis, cenoura e batata doce no vapor.",
    price: 22.9,
    image: "/images/carne-legumes.jpg",
    tags: ["Low carb"],
  },
  {
    id: "peixe-integral",
    name: "Peixe com Arroz Integral",
    description:
      "File de tilapia grelhado, arroz integral, salada verde, tomate cereja e limao.",
    price: 24.9,
    image: "/images/peixe-integral.jpg",
    tags: ["Leve", "Omega 3"],
  },
  {
    id: "vegano-fit",
    name: "Vegano Fit",
    description:
      "Quinoa, grao-de-bico assado, abacate, legumes grelhados e folhas verdes.",
    price: 20.9,
    image: "/images/vegano-fit.jpg",
    tags: ["Vegano", "Sem gluten"],
  },
  {
    id: "strogonoff",
    name: "Strogonoff de Frango",
    description:
      "Strogonoff cremoso de frango, arroz branco, batata palha e saladinha.",
    price: 19.9,
    image: "/images/strogonoff.jpg",
    tags: ["Classico", "Favorito"],
  },
  {
    id: "feijoada-fit",
    name: "Feijoada Fit",
    description:
      "Feijoada leve com carne magra, arroz, couve refogada, laranja e farofa.",
    price: 21.9,
    image: "/images/feijoada-fit.jpg",
    tags: ["Brasileiro", "Sabado"],
  },
]

export default function FreshMarmitasPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSelect = (mealId: string) => {
    setQuantities((prev) => {
      if (prev[mealId]) return prev
      return { ...prev, [mealId]: 1 }
    })
  }

  const handleIncrement = (mealId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [mealId]: (prev[mealId] || 0) + 1,
    }))
  }

  const handleDecrement = (mealId: string) => {
    setQuantities((prev) => {
      const current = prev[mealId] || 0
      if (current <= 1) {
        const next = { ...prev }
        delete next[mealId]
        return next
      }
      return { ...prev, [mealId]: current - 1 }
    })
  }

  const handleRemove = (mealId: string) => {
    setQuantities((prev) => {
      const next = { ...prev }
      delete next[mealId]
      return next
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setShowSuccess(true)
  }

  const handleSuccessClose = useCallback(() => {
    setShowSuccess(false)
    setQuantities({})
  }, [])

  const selectedItems = meals
    .filter((meal) => quantities[meal.id])
    .map((meal) => ({ meal, quantity: quantities[meal.id] }))

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItems={selectedItems}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemove}
      />

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Hero section */}
        <section className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <UtensilsCrossed className="h-7 w-7 text-primary" />
          </div>
          <h2 className="mb-2 font-serif text-3xl tracking-tight text-foreground md:text-4xl text-balance">
            Escolha suas marmitas
          </h2>
          <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground">
            Selecione as refeicoes que deseja, ajuste a quantidade e faca seu
            pedido. Entregamos fresquinho na sua porta!
          </p>
        </section>

        {/* Meals grid */}
        <section className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              quantity={quantities[meal.id] || 0}
              onSelect={() => handleSelect(meal.id)}
              onIncrement={() => handleIncrement(meal.id)}
              onDecrement={() => handleDecrement(meal.id)}
            />
          ))}
        </section>

        {/* Order form */}
        {selectedItems.length > 0 && (
          <section className="mx-auto max-w-lg pb-12">
            <OrderForm
              items={selectedItems}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Fresh Marmitas &mdash; Feito com carinho para voce comer bem todos
            os dias.
          </p>
        </div>
      </footer>

      <SuccessOverlay show={showSuccess} onClose={handleSuccessClose} />
    </div>
  )
}
