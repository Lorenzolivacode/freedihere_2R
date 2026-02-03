/**
 * Chart Components
 *
 * A collection of reusable chart components built with Recharts.
 *
 * @example Unified component (lazy loading)
 * ```tsx
 * import { Chart } from '@/components/molecules/charts'
 *
 * <Chart type="donut" data={data} title="Status" />
 * <Chart type="bar" data={data} orientation="horizontal" />
 * ```
 *
 * @example Direct imports (better tree-shaking)
 * ```tsx
 * import { DonutChart, BarChart } from '@/components/molecules/charts'
 *
 * <DonutChart data={data} title="Status" />
 * <BarChart data={data} stacked />
 * ```
 */

// Unified component with lazy loading
export { Chart } from './Chart'
export type { ChartProps, ChartType } from './Chart'

// Individual chart components
export { PieChart } from './PieChart'
export { DonutChart } from './DonutChart'
export { BarChart } from './BarChart'
export { LineChart } from './LineChart'
export { AreaChart } from './AreaChart'
export { GaugeChart } from './GaugeChart'
export { SparklineChart } from './SparklineChart'
export { RadarChart } from './RadarChart'

// Base components and utilities
export { BaseChartWrapper, ChartTooltipContent } from './BaseChart'
export { useChartTheme, getColorAtIndex, generateGradientId } from './hooks/useChartTheme'

// Types
export type {
  ChartDataPoint,
  ChartSeries,
  BaseChartProps,
  PieChartProps,
  BarChartProps,
  LineChartProps,
  GaugeChartProps,
  SparklineChartProps,
  RadarChartProps,
  ChartTooltipProps,
} from './types'
