'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { BaseChartWrapper } from './BaseChart'
import { useChartTheme } from './hooks/useChartTheme'
import type { GaugeChartProps } from './types'

const DEFAULT_THRESHOLDS = [
  { value: 33, color: '#22c55e', label: 'Basso' },
  { value: 66, color: '#f59e0b', label: 'Medio' },
  { value: 100, color: '#ef4444', label: 'Alto' },
]

export function GaugeChart({
  value,
  min = 0,
  max = 100,
  title,
  subtitle,
  width = '100%',
  height = 200,
  thresholds = DEFAULT_THRESHOLDS,
  showPercentage = true,
  format,
  colors,
  loading,
  className,
  ariaLabel,
}: GaugeChartProps) {
  const theme = useChartTheme()
  // Use custom colors if provided, otherwise use thresholds
  const chartColors = colors || thresholds.map(t => t.color)

  // Normalize value to 0-100 range
  const normalizedValue = Math.min(
    Math.max(((value - min) / (max - min)) * 100, 0),
    100
  )

  // Get color based on thresholds or custom colors
  const getColorForValue = (val: number): string => {
    const sortedThresholds = [...thresholds].sort((a, b) => a.value - b.value)
    for (let i = 0; i < sortedThresholds.length; i++) {
      if (val <= sortedThresholds[i].value) {
        return colors ? chartColors[i % chartColors.length] : sortedThresholds[i].color
      }
    }
    return chartColors[chartColors.length - 1] || theme.colors[0]
  }

  const activeColor = getColorForValue(normalizedValue)

  // Create gauge data (filled portion + empty portion)
  const gaugeData = [
    { name: 'value', value: normalizedValue },
    { name: 'empty', value: 100 - normalizedValue },
  ]

  // Format display value
  const displayValue = format
    ? format(value)
    : showPercentage
    ? `${Math.round(normalizedValue)}%`
    : value.toLocaleString()

  return (
    <BaseChartWrapper
      title={title}
      subtitle={subtitle}
      loading={loading}
      empty={false}
      className={className}
      minHeight={height as number}
    >
      <div
        aria-label={ariaLabel || title || `Gauge: ${displayValue}`}
        role="img"
        style={{ width, height }}
        className="relative"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={gaugeData}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="70%"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={0}
              stroke="none"
            >
              <Cell fill={activeColor} />
              <Cell fill="hsl(var(--muted) / 0.3)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center value display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">
            {displayValue}
          </span>
          {thresholds.find((t) => normalizedValue <= t.value)?.label && (
            <span className="text-sm text-muted-foreground">
              {thresholds.find((t) => normalizedValue <= t.value)?.label}
            </span>
          )}
        </div>

        {/* Min/Max labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-muted-foreground">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </BaseChartWrapper>
  )
}
