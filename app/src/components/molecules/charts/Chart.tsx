'use client'

import { lazy, Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import type {
  PieChartProps,
  BarChartProps,
  LineChartProps,
  GaugeChartProps,
  SparklineChartProps,
  RadarChartProps,
} from './types'

// Lazy loading for bundle splitting
const PieChartLazy = lazy(() =>
  import('./PieChart').then((m) => ({ default: m.PieChart }))
)
const DonutChartLazy = lazy(() =>
  import('./DonutChart').then((m) => ({ default: m.DonutChart }))
)
const BarChartLazy = lazy(() =>
  import('./BarChart').then((m) => ({ default: m.BarChart }))
)
const LineChartLazy = lazy(() =>
  import('./LineChart').then((m) => ({ default: m.LineChart }))
)
const AreaChartLazy = lazy(() =>
  import('./AreaChart').then((m) => ({ default: m.AreaChart }))
)
const GaugeChartLazy = lazy(() =>
  import('./GaugeChart').then((m) => ({ default: m.GaugeChart }))
)
const SparklineChartLazy = lazy(() =>
  import('./SparklineChart').then((m) => ({ default: m.SparklineChart }))
)
const RadarChartLazy = lazy(() =>
  import('./RadarChart').then((m) => ({ default: m.RadarChart }))
)

// Available chart types
export type ChartType =
  | 'pie'
  | 'donut'
  | 'bar'
  | 'line'
  | 'area'
  | 'gauge'
  | 'sparkline'
  | 'radar'

// Discriminated union for type-safe props
export type ChartProps =
  | ({ type: 'pie' } & PieChartProps)
  | ({ type: 'donut' } & PieChartProps)
  | ({ type: 'bar' } & BarChartProps)
  | ({ type: 'line' } & LineChartProps)
  | ({ type: 'area' } & LineChartProps)
  | ({ type: 'gauge' } & GaugeChartProps)
  | ({ type: 'sparkline' } & SparklineChartProps)
  | ({ type: 'radar' } & RadarChartProps)

// Loading fallback component
function ChartLoader({ height = 200 }: { height?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg border bg-card"
      style={{ height }}
    >
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  )
}

/**
 * Unified Chart component
 *
 * Use this component when you want to select chart type dynamically
 * via the `type` prop. For direct imports with better TypeScript
 * inference, import specific chart components instead.
 *
 * @example
 * ```tsx
 * <Chart type="donut" data={data} title="My Chart" />
 * <Chart type="bar" data={data} orientation="horizontal" />
 * <Chart type="gauge" value={75} max={100} />
 * ```
 */
export function Chart(props: ChartProps) {
  const { type, ...restProps } = props

  // Get height for loader (sparkline has different default)
  const loaderHeight = type === 'sparkline' ? 30 : 200

  return (
    <Suspense fallback={<ChartLoader height={loaderHeight} />}>
      {type === 'pie' && <PieChartLazy {...(restProps as PieChartProps)} />}
      {type === 'donut' && <DonutChartLazy {...(restProps as PieChartProps)} />}
      {type === 'bar' && <BarChartLazy {...(restProps as BarChartProps)} />}
      {type === 'line' && <LineChartLazy {...(restProps as LineChartProps)} />}
      {type === 'area' && <AreaChartLazy {...(restProps as LineChartProps)} />}
      {type === 'gauge' && <GaugeChartLazy {...(restProps as GaugeChartProps)} />}
      {type === 'sparkline' && (
        <SparklineChartLazy {...(restProps as SparklineChartProps)} />
      )}
      {type === 'radar' && <RadarChartLazy {...(restProps as RadarChartProps)} />}
    </Suspense>
  )
}
