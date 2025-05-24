"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Plus } from "lucide-react"
import { StockCard } from "./stock-card"
import { useMockWatchlist } from "@/hooks/use-mock-watchlist"

export function WatchlistPreview() {
  const { watchlist } = useMockWatchlist()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-1">
          <CardTitle>Watchlist</CardTitle>
          <CardDescription>Stocks you're tracking</CardDescription>
        </div>
        <div className="ml-auto">
          <Link href="/dashboard/watchlist">
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {watchlist.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {watchlist.slice(0, 3).map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="mb-4 text-muted-foreground">Your watchlist is empty</p>
            <Link href="/dashboard/watchlist">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Stocks
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
