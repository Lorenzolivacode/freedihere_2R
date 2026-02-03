'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Loader2, BarChart3 } from 'lucide-react'

interface BaseChartWrapperProps {
  title?: string
  subtitle?: string
  loading?: boolean
  empty?: boolean
  emptyMessage?: string
  className?: string
  children: ReactNode
  minHeight?: number
}

export function BaseChartWrapper({
  title,
  subtitle,
  loading,
  empty,
  emptyMessage = 'Nessun dato disponibile',
  className,
  children,
  minHeight = 200
}: BaseChartWrapperProps) {
  return (
    <div className={cn('rounded-lg border bg-card p-4', className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}

      {loading ? (
        <div
          className="flex items-center justify-center"
          style={{ minHeight }}
        >
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : empty ? (
        <div
          className="flex flex-col items-center justify-center gap-2"
          style={{ minHeight }}
        >
          <BarChart3 className="h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        children
      )}
    </div>
  )
}

/**
 * Custom Tooltip component for charts
 */
interface ChartTooltipContentProps {
  label?: string
  value?: number | string
  color?: string
  subtitle?: string
  formatter?: (value: number) => string
}

export function ChartTooltipContent({
  label,
  value,
  color,
  subtitle,
  formatter
}: ChartTooltipContentProps) {
  const formattedValue =
    typeof value === 'number' && formatter ? formatter(value) : value

  return (
    <div className="rounded-lg border bg-popover px-3 py-2 shadow-md">
      <div className="flex items-center gap-2">
        {color && (
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
        <span className="font-medium text-popover-foreground">{label}</span>
      </div>
      {formattedValue !== undefined && (
        <p className="mt-1 text-sm font-semibold text-popover-foreground">
          {formattedValue}
        </p>
      )}
      {subtitle && (
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      )}
    </div>
  )
}
