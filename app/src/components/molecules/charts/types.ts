/**
 * Chart Components - TypeScript Interfaces
 *
 * Shared types for all chart components
 */

/**
 * Singolo punto dati
 */
export interface ChartDataPoint {
  id: string
  label: string
  value: number
  color?: string // Colore specifico per questo punto
  metadata?: Record<string, unknown> // Dati extra per tooltip
}

/**
 * Serie di dati (per grafici multi-serie)
 */
export interface ChartSeries {
  id: string
  name: string
  data: ChartDataPoint[]
  color?: string // Colore della serie
  type?: 'line' | 'bar' | 'area' // Per grafici misti
}

/**
 * Props comuni a tutti i grafici
 */
export interface BaseChartProps {
  // === DATI ===
  data: ChartDataPoint[] | ChartSeries[]

  // === DIMENSIONI ===
  width?: number | string // Default: '100%'
  height?: number // Default: 300

  // === TITOLO E DESCRIZIONE ===
  title?: string
  subtitle?: string

  // === COLORI ===
  backgroundColor?: string // Default: 'transparent'
  colors?: string[] // Palette colori (override tema)

  // === VISIBILITÀ ELEMENTI ===
  showLegend?: boolean // Default: true
  showTooltip?: boolean // Default: true
  showDataLabels?: boolean // Valori sui punti/barre
  showGrid?: boolean // Griglia di sfondo
  showAxis?: boolean // Assi X/Y (per bar/line/area)

  // === ASSI (per grafici cartesiani) ===
  xAxisLabel?: string
  yAxisLabel?: string
  xAxisValues?: string[] | number[] // Override valori asse X
  yAxisDomain?: [number, number] // Range asse Y [min, max]

  // === ANIMAZIONI ===
  animated?: boolean // Default: true
  animationDuration?: number // Default: 300ms

  // === INTERATTIVITÀ ===
  onDataPointClick?: (point: ChartDataPoint, index: number) => void
  onLegendItemClick?: (item: ChartDataPoint, index: number) => void
  onSeriesToggle?: (seriesId: string, visible: boolean) => void

  // === STATI ===
  loading?: boolean
  emptyMessage?: string // Default: 'Nessun dato disponibile'

  // === ACCESSIBILITÀ ===
  ariaLabel?: string

  // === STILE ===
  className?: string
}

/**
 * Props specifiche per Pie/Donut
 */
export interface PieChartProps extends BaseChartProps {
  innerRadius?: number // 0 = pie, >0 = donut
  outerRadius?: number | string
  padAngle?: number // Spazio tra fette
  cornerRadius?: number // Arrotondamento fette
  centerLabel?: string // Testo al centro (solo donut)
  centerValue?: string | number
}

/**
 * Props specifiche per Bar
 */
export interface BarChartProps extends BaseChartProps {
  orientation?: 'vertical' | 'horizontal'
  stacked?: boolean
  barSize?: number
  barGap?: number
  barCategoryGap?: number | string
}

/**
 * Props specifiche per Line/Area
 */
export interface LineChartProps extends BaseChartProps {
  curved?: boolean // Linee curve vs rette
  strokeWidth?: number
  showDots?: boolean
  dotSize?: number
  fillArea?: boolean // true = Area chart
  fillOpacity?: number
}

/**
 * Props specifiche per Gauge
 */
export interface GaugeChartProps {
  value: number
  min?: number // Default: 0
  max?: number // Default: 100
  title?: string
  subtitle?: string
  width?: number | string
  height?: number
  thresholds?: Array<{
    value: number
    color: string
    label?: string
  }>
  showPercentage?: boolean
  format?: (value: number) => string
  colors?: string[]
  loading?: boolean
  className?: string
  ariaLabel?: string
}

/**
 * Props specifiche per Sparkline
 */
export interface SparklineChartProps {
  data: number[]
  width?: number // Default: 100
  height?: number // Default: 30
  color?: string
  fillColor?: string
  showMinMax?: boolean
  showLastValue?: boolean
  curved?: boolean
  className?: string
}

/**
 * Props specifiche per Radar
 */
export interface RadarChartProps extends BaseChartProps {
  fillOpacity?: number
  strokeWidth?: number
}

/**
 * Tooltip content props
 */
export interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{
    payload: ChartDataPoint
    value: number
    name: string
    color: string
  }>
  label?: string
}
