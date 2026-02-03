'use client'

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { BaseChartWrapper } from './BaseChart'
import { useChartTheme, getColorAtIndex } from './hooks/useChartTheme'
import type { LineChartProps, ChartDataPoint, ChartSeries } from './types'

export function LineChart({
  data,
  title,
  subtitle,
  width = '100%',
  height = 300,
  curved = true,
  strokeWidth = 2,
  showDots = true,
  dotSize = 4,
  fillArea = false,
  fillOpacity = 0.2,
  colors,
  showLegend = false,
  showTooltip = true,
  showDataLabels = false,
  showGrid = true,
  showAxis = true,
  xAxisLabel,
  yAxisLabel,
  yAxisDomain,
  loading,
  animated = true,
  animationDuration = 300,
  onDataPointClick,
  emptyMessage,
  ariaLabel,
  className,
}: LineChartProps) {
  const theme = useChartTheme()
  const chartColors = colors || theme.colors

  // Check if data is multi-series
  const isMultiSeries =
    data.length > 0 && 'data' in (data[0] as ChartSeries)

  // For simple data, transform to recharts format
  const chartData = isMultiSeries
    ? transformMultiSeriesData(data as ChartSeries[])
    : (data as ChartDataPoint[])

  const seriesList = isMultiSeries
    ? (data as ChartSeries[])
    : [{ id: 'value', name: 'Valore', data: data as ChartDataPoint[] }]

  const isEmpty = !chartData || chartData.length === 0

  const curveType = curved ? 'monotone' : 'linear'

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
        aria-label={ariaLabel || title || 'Line chart'}
        role="img"
        style={{ width, height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={chartData}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e: any) => {
              if (e?.activePayload?.[0] && !isMultiSeries) {
                const index = (e.activeTooltipIndex as number) ?? 0
                onDataPointClick?.(chartData[index] as ChartDataPoint, index)
              }
            }}
          >
            {/* Gradient definitions for area fill */}
            {fillArea && (
              <defs>
                {seriesList.map((series, index) => (
                  <linearGradient
                    key={series.id}
                    id={`gradient-${series.id}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={
                        series.color || getColorAtIndex(chartColors, index)
                      }
                      stopOpacity={fillOpacity}
                    />
                    <stop
                      offset="95%"
                      stopColor={
                        series.color || getColorAtIndex(chartColors, index)
                      }
                      stopOpacity={0}
                    />
                  </linearGradient>
                ))}
              </defs>
            )}

            {showGrid && (
              <CartesianGrid
                strokeDasharray={theme.grid.strokeDasharray}
                stroke={theme.grid.stroke}
              />
            )}

            {showAxis && (
              <>
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: theme.axis.fontSize }}
                  tickLine={false}
                  axisLine={{ stroke: theme.axis.stroke }}
                  label={
                    xAxisLabel
                      ? { value: xAxisLabel, position: 'bottom', offset: 0 }
                      : undefined
                  }
                />
                <YAxis
                  tick={{ fontSize: theme.axis.fontSize }}
                  tickLine={false}
                  axisLine={{ stroke: theme.axis.stroke }}
                  domain={yAxisDomain}
                  label={
                    yAxisLabel
                      ? {
                          value: yAxisLabel,
                          angle: -90,
                          position: 'insideLeft',
                        }
                      : undefined
                  }
                />
              </>
            )}

            {showTooltip && (
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null

                  return (
                    <div className="rounded-lg border bg-popover px-3 py-2 shadow-md">
                      <p className="mb-1 font-medium text-popover-foreground">
                        {label}
                      </p>
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
                <Line
                  key={series.id}
                  type={curveType}
                  dataKey={isMultiSeries ? series.id : 'value'}
                  name={series.name}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  dot={
                    showDots
                      ? {
                          r: dotSize,
                          fill: color,
                          strokeWidth: 0,
                        }
                      : false
                  }
                  activeDot={
                    showDots
                      ? {
                          r: dotSize + 2,
                          fill: color,
                          strokeWidth: 2,
                          stroke: 'white',
                        }
                      : undefined
                  }
                  isAnimationActive={animated}
                  animationDuration={animationDuration}
                  label={
                    showDataLabels
                      ? {
                          position: 'top',
                          fontSize: 10,
                          fill: theme.text.secondary,
                        }
                      : undefined
                  }
                  // Area fill under line
                  fill={fillArea ? `url(#gradient-${series.id})` : 'none'}
                  fillOpacity={fillArea ? 1 : 0}
                />
              )
            })}
          </RechartsLineChart>
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
