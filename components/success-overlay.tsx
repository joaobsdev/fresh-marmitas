"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"

interface SuccessOverlayProps {
  show: boolean
  onClose: () => void
}

export function SuccessOverlay({ show, onClose }: SuccessOverlayProps) {
  const [visible, setVisible] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimateIn(true)
        })
      })
      const timer = setTimeout(() => {
        setAnimateIn(false)
        setTimeout(() => {
          setVisible(false)
          onClose()
        }, 500)
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
        animateIn ? "bg-foreground/50 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div
        className={`mx-4 flex max-w-sm flex-col items-center gap-4 rounded-2xl bg-card px-8 py-10 text-center shadow-2xl transition-all duration-500 ${
          animateIn
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 translate-y-4"
        }`}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2
            className={`h-12 w-12 text-primary transition-all duration-700 delay-200 ${
              animateIn ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          />
        </div>
        <h2 className="font-serif text-2xl text-card-foreground">
          {"Pedido enviado com sucesso! \uD83E\uDD57"}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Seu pedido foi recebido e esta sendo preparado com todo carinho.
          Aguarde a confirmacao!
        </p>
        <div
          className={`mt-2 h-1 rounded-full bg-primary transition-all duration-[3500ms] ease-linear ${
            animateIn ? "w-full" : "w-0"
          }`}
          style={{ maxWidth: "200px" }}
        />
      </div>
    </div>
  )
}
