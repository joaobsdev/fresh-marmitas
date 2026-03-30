"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { OrderCard, type Order, type OrderStatus } from "@/components/order-card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Clock, ChefHat, Package, Truck, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"

const initialOrders: Order[] = [
  {
    id: "001",
    customerName: "Maria Santos",
    contact: "(11) 99999-1234",
    items: [
      { name: "Frango Grelhado Fit", quantity: 2, price: 24.9 },
      { name: "Vegano Fit", quantity: 1, price: 26.9 },
    ],
    observation: "Sem cebola no frango, por favor",
    status: "pendente",
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    total: 76.7,
  },
  {
    id: "002",
    customerName: "Caio Santos",
    contact: "(11) 98888-8888",
    items: [
      { name: "Carne com Legumes", quantity: 1, price: 27.9 },
      { name: "Strogonoff de Frango", quantity: 2, price: 25.9 },
    ],
    observation: "",
    status: "preparo",
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    total: 79.7,
  },
  {
    id: "003",
    customerName: "Amélia Oliveira",
    contact: "(11) 97777-9012",
    items: [{ name: "Peixe Integral", quantity: 3, price: 29.9 }],
    observation: "Adicionar limao extra",
    status: "pronto",
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
    total: 89.7,
  },
  {
    id: "004",
    customerName: "Carlos Ferreira",
    contact: "(11) 96666-3456",
    items: [
      { name: "Feijoada Fit", quantity: 1, price: 28.9 },
      { name: "Frango Grelhado Fit", quantity: 1, price: 24.9 },
    ],
    observation: "Menos sal na feijoada",
    status: "entregue",
    createdAt: new Date(Date.now() - 90 * 60 * 1000),
    total: 53.8,
  },
  {
    id: "005",
    customerName: "Patricia Lima",
    contact: "(11) 95555-7890",
    items: [{ name: "Vegano Fit", quantity: 2, price: 26.9 }],
    observation: "",
    status: "pendente",
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    total: 53.8,
  },
  {
    id: "006",
    customerName: "Roberto Almeida",
    contact: "(11) 94444-2345",
    items: [
      { name: "Strogonoff de Frango", quantity: 1, price: 25.9 },
      { name: "Carne com Legumes", quantity: 1, price: 27.9 },
      { name: "Peixe Integral", quantity: 1, price: 29.9 },
    ],
    observation: "Entregar apos as 12h",
    status: "preparo",
    createdAt: new Date(Date.now() - 25 * 60 * 1000),
    total: 83.7,
  },
]

const statusTabs: { value: OrderStatus | "todos"; label: string; icon: React.ElementType }[] = [
  { value: "todos", label: "Todos", icon: ClipboardList },
  { value: "pendente", label: "Pendentes", icon: Clock },
  { value: "preparo", label: "Em Preparo", icon: ChefHat },
  { value: "pronto", label: "Prontos", icon: Package },
  { value: "entregue", label: "Entregues", icon: Truck },
]

const statusColors: Record<OrderStatus | "todos", string> = {
  todos: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
  pendente: "data-[state=active]:bg-amber-500 data-[state=active]:text-white",
  preparo: "data-[state=active]:bg-blue-500 data-[state=active]:text-white",
  pronto: "data-[state=active]:bg-emerald-500 data-[state=active]:text-white",
  entregue: "data-[state=active]:bg-slate-500 data-[state=active]:text-white",
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [activeTab, setActiveTab] = useState<OrderStatus | "todos">("todos")

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    )
  }

  const filteredOrders =
    activeTab === "todos" ? orders : orders.filter((order) => order.status === activeTab)

  const getOrderCount = (status: OrderStatus | "todos") => {
    if (status === "todos") return orders.length
    return orders.filter((order) => order.status === status).length
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Stats summary */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(["pendente", "preparo", "pronto", "entregue"] as const).map((status) => {
            const count = getOrderCount(status)
            const config = {
              pendente: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", label: "Pendentes" },
              preparo: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", label: "Em Preparo" },
              pronto: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", label: "Prontos" },
              entregue: { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-600", label: "Entregues" },
            }[status]

            return (
              <button
                key={status}
                type="button"
                onClick={() => setActiveTab(status)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border-2 p-4 transition-all hover:scale-[1.02]",
                  config.bg,
                  config.border,
                  activeTab === status && "ring-2 ring-offset-2",
                  activeTab === status && config.border.replace("border", "ring")
                )}
              >
                <span className={cn("text-3xl font-bold", config.text)}>{count}</span>
                <span className={cn("text-sm font-medium", config.text)}>{config.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tabs and orders */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as OrderStatus | "todos")}>
          <TabsList className="mb-6 flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
            {statusTabs.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className={cn(
                  "flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-all",
                  "hover:bg-muted",
                  statusColors[value]
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
                <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs font-bold">
                  {getOrderCount(value)}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {statusTabs.map(({ value }) => (
            <TabsContent key={value} value={value} className="mt-0">
              {filteredOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card py-16">
                  <ClipboardList className="mb-4 h-12 w-12 text-muted-foreground/50" />
                  <p className="text-lg font-medium text-muted-foreground">
                    Nenhum pedido {value !== "todos" && `com status "${statusTabs.find(t => t.value === value)?.label}"`}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground/70">
                    Os pedidos aparecerao aqui quando chegarem
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredOrders.map((order) => (
                    <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  )
}