'use client'

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import { BaseChartWrapper } from './BaseChart'
import { useChartTheme, getColorAtIndex } from './hooks/useChartTheme'
import type { PieChartProps, ChartDataPoint } from './types'

export function DonutChart({
  data,
  title,
  subtitle,
  width = '100%',
  height = 300,
  innerRadius = 60,
  outerRadius = '80%',
  padAngle = 2,
  cornerRadius = 4,
  colors,
  showLegend = true,
  showTooltip = true,
  showDataLabels = false,
  centerLabel,
  centerValue,
  loading,
  animated = true,
  animationDuration = 300,
  onDataPointClick,
  onLegendItemClick,
  emptyMessage,
  ariaLabel,
  className,
}: PieChartProps) {
  const theme = useChartTheme()
  const chartColors = colors || theme.colors

  const chartData = data as ChartDataPoint[]
  const isEmpty = !chartData || chartData.length === 0

  const handlePieClick = (entry: ChartDataPoint, index: number) => {
    onDataPointClick?.(entry, index)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCustomLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius: ir, outerRadius: or, percent } = props
    const RADIAN = Math.PI / 180
    const radius = ir + (or - ir) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    if (percent < 0.05) return null // Hide labels for small slices

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

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
        aria-label={ariaLabel || title || 'Donut chart'}
        role="img"
        style={{ width, height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={chartData as unknown as Record<string, unknown>[]}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={padAngle}
              cornerRadius={cornerRadius}
              isAnimationActive={animated}
              animationDuration={animationDuration}
              onClick={(_, index) => handlePieClick(chartData[index], index)}
              label={showDataLabels ? renderCustomLabel : undefined}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.id}
                  fill={entry.color || getColorAtIndex(chartColors, index)}
                  className="cursor-pointer outline-none transition-opacity hover:opacity-80 focus:opacity-80"
                  stroke="transparent"
                />
              ))}
            </Pie>

            {showTooltip && (
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.[0]) return null
                  const item = payload[0].payload as ChartDataPoint
                  const total = chartData.reduce((sum, d) => sum + d.value, 0)
                  const percent = ((item.value / total) * 100).toFixed(1)

                  return (
                    <div className="rounded-lg border bg-popover px-3 py-2 shadow-md">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor:
                              item.color ||
                              getColorAtIndex(
                                chartColors,
                                chartData.findIndex((d) => d.id === item.id)
                              ),
                          }}
                        />
                        <span className="font-medium text-popover-foreground">
                          {item.label}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-popover-foreground">
                        <span className="font-semibold">
                          {item.value.toLocaleString()}
                        </span>
                        <span className="ml-1 text-muted-foreground">
                          ({percent}%)
                        </span>
                      </p>
                    </div>
                  )
                }}
              />
            )}

            {showLegend && (
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 16 }}
                formatter={(value, entry, index) => (
                  <span
                    className="cursor-pointer text-sm text-foreground hover:underline"
                    onClick={(e) => {
                      e.stopPropagation()
                      onLegendItemClick?.(chartData[index], index)
                    }}
                  >
                    {value}
                  </span>
                )}
              />
            )}

            {/* Center text for donut */}
            {(centerLabel || centerValue) && innerRadius > 0 && (
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {centerValue !== undefined && (
                  <tspan
                    x="50%"
                    dy={centerLabel ? '-0.5em' : '0'}
                    className="fill-foreground text-2xl font-bold"
                  >
                    {centerValue}
                  </tspan>
                )}
                {centerLabel && (
                  <tspan
                    x="50%"
                    dy={centerValue !== undefined ? '1.5em' : '0'}
                    className="fill-muted-foreground text-sm"
                  >
                    {centerLabel}
                  </tspan>
                )}
              </text>
            )}
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </BaseChartWrapper>
  )
}
