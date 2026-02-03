'use client'

import { DonutChart } from './DonutChart'
import type { PieChartProps } from './types'

/**
 * PieChart - A solid pie chart without center hole
 * This is a wrapper around DonutChart with innerRadius=0
 */
export function PieChart(props: PieChartProps) {
  return <DonutChart {...props} innerRadius={0} />
}
