'use client'

import {
  LineChart,
  Line,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts'
import { cn } from '@/lib/utils'
import { useChartTheme } from './hooks/useChartTheme'
import type { SparklineChartProps } from './types'

export function SparklineChart({
  data,
  width = 100,
  height = 30,
  color,
  fillColor,
  showMinMax = false,
  showLastValue = false,
  curved = true,
  className,
}: SparklineChartProps) {
  const theme = useChartTheme()
  const lineColor = color || theme.colors[0]

  // Transform data array to chart format
  const chartData = data.map((value, index) => ({
    index,
    value,
  }))

  // Find min/max for reference dots
  const minValue = Math.min(...data)
  const maxValue = Math.max(...data)
  const minIndex = data.indexOf(minValue)
  const maxIndex = data.indexOf(maxValue)
  const lastValue = data[data.length - 1]

  const curveType = curved ? 'monotone' : 'linear'

  return (
    <div
      className={cn('inline-flex items-center gap-2', className)}
      style={{ width, height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          {fillColor && (
            <defs>
              <linearGradient id="sparkline-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={fillColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={fillColor} stopOpacity={0} />
              </linearGradient>
            </defs>
          )}

          <Line
            type={curveType}
            dataKey="value"
            stroke={lineColor}
            strokeWidth={1.5}
            dot={false}
            fill={fillColor ? 'url(#sparkline-fill)' : 'none'}
            isAnimationActive={false}
          />

          {showMinMax && (
            <>
              <ReferenceDot
                x={minIndex}
                y={minValue}
                r={3}
                fill={theme.semantic.error}
                stroke="white"
                strokeWidth={1}
              />
              <ReferenceDot
                x={maxIndex}
                y={maxValue}
                r={3}
                fill={theme.semantic.success}
                stroke="white"
                strokeWidth={1}
              />
            </>
          )}

          {/* Last point dot */}
          <ReferenceDot
            x={data.length - 1}
            y={lastValue}
            r={2.5}
            fill={lineColor}
            stroke="white"
            strokeWidth={1}
          />
        </LineChart>
      </ResponsiveContainer>

      {showLastValue && (
        <span
          className="text-xs font-medium tabular-nums"
          style={{ color: lineColor }}
        >
          {lastValue.toLocaleString()}
        </span>
      )}
    </div>
  )
}
