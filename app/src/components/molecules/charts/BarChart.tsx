'use client'

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { BaseChartWrapper } from './BaseChart'
import { useChartTheme, getColorAtIndex } from './hooks/useChartTheme'
import type { BarChartProps, ChartDataPoint, ChartSeries } from './types'

export function BarChart({
  data,
  title,
  subtitle,
  width = '100%',
  height = 300,
  orientation = 'vertical',
  stacked = false,
  barSize,
  barGap = 4,
  barCategoryGap = '20%',
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
  onLegendItemClick,
  emptyMessage,
  ariaLabel,
  className,
}: BarChartProps) {
  const theme = useChartTheme()
  const chartColors = colors || theme.colors

  // Check if data is multi-series
  const isMultiSeries =
    data.length > 0 && 'data' in (data[0] as ChartSeries)

  // For simple data, transform to recharts format
  const chartData = isMultiSeries
    ? transformMultiSeriesData(data as ChartSeries[])
    : (data as ChartDataPoint[])

  const seriesKeys = isMultiSeries
    ? (data as ChartSeries[]).map((s) => s.id)
    : ['value']

  const isEmpty = !chartData || chartData.length === 0

  const isHorizontal = orientation === 'horizontal'

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
        aria-label={ariaLabel || title || 'Bar chart'}
        role="img"
        style={{ width, height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={chartData}
            layout={isHorizontal ? 'vertical' : 'horizontal'}
            barGap={barGap}
            barCategoryGap={barCategoryGap}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray={theme.grid.strokeDasharray}
                stroke={theme.grid.stroke}
                vertical={!isHorizontal}
                horizontal={isHorizontal}
              />
            )}

            {showAxis && (
              <>
                {isHorizontal ? (
                  <>
                    <XAxis
                      type="number"
                      tick={{ fontSize: theme.axis.fontSize }}
                      tickLine={false}
                      axisLine={{ stroke: theme.axis.stroke }}
                      domain={yAxisDomain}
                      label={
                        yAxisLabel
                          ? {
                              value: yAxisLabel,
                              position: 'bottom',
                              offset: 0,
                            }
                          : undefined
                      }
                    />
                    <YAxis
                      type="category"
                      dataKey="label"
                      tick={{ fontSize: theme.axis.fontSize }}
                      tickLine={false}
                      axisLine={{ stroke: theme.axis.stroke }}
                      width={100}
                      label={
                        xAxisLabel
                          ? {
                              value: xAxisLabel,
                              angle: -90,
                              position: 'insideLeft',
                            }
                          : undefined
                      }
                    />
                  </>
                ) : (
                  <>
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: theme.axis.fontSize }}
                      tickLine={false}
                      axisLine={{ stroke: theme.axis.stroke }}
                      label={
                        xAxisLabel
                          ? {
                              value: xAxisLabel,
                              position: 'bottom',
                              offset: 0,
                            }
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
              </>
            )}

            {showTooltip && (
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
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

            {showLegend && isMultiSeries && (
              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ paddingTop: 16 }}
                formatter={(value, entry, index) => (
                  <span
                    className="cursor-pointer text-sm text-foreground hover:underline"
                    onClick={(e) => {
                      e.stopPropagation()
                      const series = (data as ChartSeries[])[index]
                      if (series && onLegendItemClick) {
                        // Create a synthetic ChartDataPoint for the series
                        onLegendItemClick(
                          { id: series.id, label: series.name, value: 0 },
                          index
                        )
                      }
                    }}
                  >
                    {value}
                  </span>
                )}
              />
            )}

            {isMultiSeries ? (
              // Multi-series bars
              (data as ChartSeries[]).map((series, seriesIndex) => (
                <Bar
                  key={series.id}
                  dataKey={series.id}
                  name={series.name}
                  fill={
                    series.color || getColorAtIndex(chartColors, seriesIndex)
                  }
                  stackId={stacked ? 'stack' : undefined}
                  barSize={barSize}
                  isAnimationActive={animated}
                  animationDuration={animationDuration}
                  radius={[4, 4, 0, 0]}
                  label={
                    showDataLabels
                      ? {
                          position: 'top',
                          fontSize: 11,
                          fill: theme.text.secondary,
                        }
                      : undefined
                  }
                />
              ))
            ) : (
              // Single series with individual colors
              <Bar
                dataKey="value"
                name="Valore"
                isAnimationActive={animated}
                animationDuration={animationDuration}
                barSize={barSize}
                radius={[4, 4, 0, 0]}
                onClick={(data, index) =>
                  onDataPointClick?.(chartData[index] as ChartDataPoint, index)
                }
                label={
                  showDataLabels
                    ? {
                        position: 'top',
                        fontSize: 11,
                        fill: theme.text.secondary,
                      }
                    : undefined
                }
              >
                {(chartData as ChartDataPoint[]).map((entry, index) => (
                  <Cell
                    key={entry.id}
                    fill={entry.color || getColorAtIndex(chartColors, index)}
                    className="cursor-pointer transition-opacity hover:opacity-80"
                  />
                ))}
              </Bar>
            )}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </BaseChartWrapper>
  )
}

/**
 * Transform multi-series data to recharts format
 * From: [{ id, name, data: [{id, label, value}] }]
 * To: [{ label, series1: value, series2: value }]
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
