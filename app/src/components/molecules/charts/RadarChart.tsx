'use client'

import {
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import { BaseChartWrapper } from './BaseChart'
import { useChartTheme, getColorAtIndex } from './hooks/useChartTheme'
import type { RadarChartProps, ChartDataPoint, ChartSeries } from './types'

export function RadarChart({
  data,
  title,
  subtitle,
  width = '100%',
  height = 300,
  fillOpacity = 0.3,
  strokeWidth = 2,
  colors,
  showLegend = true,
  showTooltip = true,
  loading,
  animated = true,
  animationDuration = 300,
  emptyMessage,
  ariaLabel,
  className,
}: RadarChartProps) {
  const theme = useChartTheme()
  const chartColors = colors || theme.colors

  // Check if data is multi-series
  const isMultiSeries =
    data.length > 0 && 'data' in (data[0] as ChartSeries)

  // For simple data, use directly
  // For multi-series, transform
  const chartData = isMultiSeries
    ? transformMultiSeriesData(data as ChartSeries[])
    : (data as ChartDataPoint[])

  const seriesList = isMultiSeries
    ? (data as ChartSeries[])
    : [{ id: 'value', name: 'Valore', color: chartColors[0] }]

  const isEmpty = !chartData || chartData.length === 0

  return (
    <BaseChartWrapper
      title={title}
      subtitle={subtitle}
      loading={loading}
      empty={isEmpty}
      emptyMessage={emptyMessage}
      className={className}
      minHeight={height as number}
    >
      <div
        aria-label={ariaLabel || title || 'Radar chart'}
        role="img"
        style={{ width, height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart data={chartData} cx="50%" cy="50%" outerRadius="80%">
            <PolarGrid stroke={theme.grid.stroke} />
            <PolarAngleAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: theme.text.secondary }}
            />
            <PolarRadiusAxis
              tick={{ fontSize: 10, fill: theme.text.secondary }}
              axisLine={false}
            />

            {showTooltip && (
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null

                  return (
                    <div className="rounded-lg border bg-popover px-3 py-2 shadow-md">
                      {payload.map((entry, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-muted-foreground">
                            {entry.name}:
                          </span>
                          <span className="font-semibold text-popover-foreground">
                            {(entry.value as number).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )
                }}
              />
            )}

            {showLegend && seriesList.length > 1 && (
              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ paddingTop: 16 }}
              />
            )}

            {seriesList.map((series, index) => {
              const color =
                series.color || getColorAtIndex(chartColors, index)

              return (
                <Radar
                  key={series.id}
                  name={series.name}
                  dataKey={isMultiSeries ? series.id : 'value'}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  fill={color}
                  fillOpacity={fillOpacity}
                  isAnimationActive={animated}
                  animationDuration={animationDuration}
                />
              )
            })}
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </BaseChartWrapper>
  )
}

/**
 * Transform multi-series data to recharts format
 */
function transformMultiSeriesData(
  series: ChartSeries[]
): Record<string, string | number>[] {
  const labelMap = new Map<string, Record<string, string | number>>()

  series.forEach((s) => {
    s.data.forEach((point) => {
      if (!labelMap.has(point.label)) {
        labelMap.set(point.label, { label: point.label })
      }
      const entry = labelMap.get(point.label)!
      entry[s.id] = point.value
    })
  })

  return Array.from(labelMap.values())
}
