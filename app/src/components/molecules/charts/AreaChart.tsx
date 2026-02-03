'use client'

import { LineChart } from './LineChart'
import type { LineChartProps } from './types'

/**
 * AreaChart - A line chart with filled area under the line
 * This is a wrapper around LineChart with fillArea=true
 */
export function AreaChart({
  fillOpacity = 0.3,
  ...props
}: LineChartProps) {
  return <LineChart {...props} fillArea fillOpacity={fillOpacity} />
}
