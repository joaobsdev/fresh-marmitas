"use client"

import { useState } from "react"
import { Clock, Phone, User, FileText, ChefHat, Package, Truck, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type OrderStatus = "pendente" | "preparo" | "pronto" | "entregue"

export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  customerName: string
  contact: string
  items: OrderItem[]
  observation: string
  status: OrderStatus
  createdAt: Date
  total: number
}

interface OrderCardProps {
  order: Order
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void
}

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; bgColor: string; borderColor: string; icon: React.ElementType }
> = {
  pendente: {
    label: "Pendente",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: Clock,
  },
  preparo: {
    label: "Em Preparo",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: ChefHat,
  },
  pronto: {
    label: "Pronto",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    icon: Package,
  },
  entregue: {
    label: "Entregue",
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    icon: Check,
  },
}

const statusButtons: { status: OrderStatus; icon: React.ElementType; label: string }[] = [
  { status: "pendente", icon: Clock, label: "Pendente" },
  { status: "preparo", icon: ChefHat, label: "Preparo" },
  { status: "pronto", icon: Package, label: "Pronto" },
  { status: "entregue", icon: Truck, label: "Entregue" },
]

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const config = statusConfig[order.status]
  const StatusIcon = config.icon

  const handleStatusChange = (newStatus: OrderStatus) => {
    if (newStatus === order.status) return
    setIsAnimating(true)
    setTimeout(() => {
      onStatusChange(order.id, newStatus)
      setIsAnimating(false)
    }, 200)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border-2 bg-card transition-all duration-300",
        config.borderColor,
        isAnimating && "scale-[0.98] opacity-70"
      )}
    >
      <div className={cn("flex items-center justify-between px-4 py-3", config.bgColor)}>
        <div className="flex items-center gap-2">
          <StatusIcon className={cn("h-4 w-4", config.color)} />
          <span className={cn("text-sm font-semibold", config.color)}>{config.label}</span>
        </div>
        <span className="text-xs text-muted-foreground">#{order.id}</span>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-card-foreground">{order.customerName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{order.contact}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{formatTime(order.createdAt)}</span>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-3">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Pedido
          </h4>
          <ul className="flex flex-col gap-1">
            {order.items.map((item, index) => (
              <li key={index} className="flex items-center justify-between text-sm">
                <span className="text-card-foreground">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-medium text-card-foreground">
                  R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
            <span className="text-sm font-semibold text-card-foreground">Total</span>
            <span className="text-base font-bold text-primary">
              R$ {order.total.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>

        {order.observation && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                Observacao
              </span>
              <p className="mt-0.5 text-sm text-amber-800">{order.observation}</p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {statusButtons.map(({ status, icon: Icon, label }) => (
            <button
              key={status}
              type="button"
              onClick={() => handleStatusChange(status)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
                order.status === status
                  ? cn(statusConfig[status].bgColor, statusConfig[status].color, "ring-2 ring-offset-1", statusConfig[status].borderColor.replace("border", "ring"))
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
