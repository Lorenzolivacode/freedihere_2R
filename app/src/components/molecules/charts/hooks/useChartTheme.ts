'use client'

import { useMemo } from 'react'

/**
 * Chart color palette
 * Uses CSS variables when available, fallbacks to hex colors
 */
const CHART_COLORS = {
  primary: [
    '#6366f1', // indigo-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
    '#f97316', // orange-500
    '#14b8a6', // teal-500
    '#3b82f6', // blue-500
    '#22c55e', // green-500
    '#eab308', // yellow-500
  ],
  semantic: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  gradients: {
    primary: ['#6366f1', '#8b5cf6', '#a855f7'],
    success: ['#22c55e', '#10b981', '#14b8a6'],
    warm: ['#f97316', '#f59e0b', '#eab308'],
    cool: ['#3b82f6', '#6366f1', '#8b5cf6'],
  },
}

export interface ChartTheme {
  colors: string[]
  semantic: {
    success: string
    warning: string
    error: string
    info: string
  }
  gradients: {
    primary: string[]
    success: string[]
    warm: string[]
    cool: string[]
  }
  tooltip: {
    backgroundColor: string
    borderColor: string
    textColor: string
  }
  grid: {
    stroke: string
    strokeDasharray: string
  }
  axis: {
    stroke: string
    fontSize: number
    tickColor: string
  }
  text: {
    primary: string
    secondary: string
  }
}

/**
 * Hook to get chart theme colors and styles
 * Provides consistent styling across all chart components
 */
export function useChartTheme(): ChartTheme {
  return useMemo(
    () => ({
      colors: CHART_COLORS.primary,
      semantic: CHART_COLORS.semantic,
      gradients: CHART_COLORS.gradients,

      tooltip: {
        backgroundColor: 'hsl(var(--popover, 0 0% 100%))',
        borderColor: 'hsl(var(--border, 0 0% 90%))',
        textColor: 'hsl(var(--popover-foreground, 0 0% 10%))',
      },

      grid: {
        stroke: 'hsl(var(--border, 0 0% 90%))',
        strokeDasharray: '3 3',
      },

      axis: {
        stroke: 'hsl(var(--muted-foreground, 0 0% 45%))',
        fontSize: 12,
        tickColor: 'hsl(var(--muted-foreground, 0 0% 45%))',
      },

      text: {
        primary: 'hsl(var(--foreground, 0 0% 10%))',
        secondary: 'hsl(var(--muted-foreground, 0 0% 45%))',
      },
    }),
    []
  )
}

/**
 * Get color at specific index with wrapping
 */
export function getColorAtIndex(
  colors: string[],
  index: number,
  fallback?: string
): string {
  if (colors.length === 0) return fallback || CHART_COLORS.primary[0]
  return colors[index % colors.length]
}

/**
 * Generate gradient ID for SVG definitions
 */
export function generateGradientId(prefix: string, index: number): string {
  return `${prefix}-gradient-${index}`
}
