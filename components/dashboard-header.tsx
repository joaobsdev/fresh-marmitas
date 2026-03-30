"use client"

import { Leaf, LayoutDashboard } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-normal tracking-tight text-foreground">
              Fresh Marmitas
            </h1>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <LayoutDashboard className="h-3 w-3" />
              Painel do Administrador
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/80"
          >
            Ver Loja
          </Link>
          <div className="hidden items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-medium text-primary">
              Loja aberta
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
