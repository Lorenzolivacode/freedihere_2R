# Componenti Grafici per AI Studio

## Obiettivo

Creare una libreria di componenti grafici **generici e riutilizzabili** per visualizzare dati nella sezione "AI Studio" e in altre parti dell'applicazione.

---

## Libreria Consigliata

**Recharts** (già usato in altri progetti Next.js/React)

- ✅ Basato su React e SVG
- ✅ Responsive out-of-the-box
- ✅ Ottimo per SSR/Next.js
- ✅ Bundle size contenuto
- ✅ Buona documentazione

```bash
npm install recharts
```

Alternative valide:

- **@visx/visx** - Più controllo, più complesso
- **Chart.js + react-chartjs-2** - Canvas-based, migliore performance con molti dati

---

## Struttura Cartelle

```
src/components/molecules/charts/
├── index.ts                    # Barrel export
├── types.ts                    # TypeScript interfaces condivise
├── BaseChart.tsx               # Wrapper comune (loading, error, empty states)
├── PieChart.tsx                # Grafico a torta
├── DonutChart.tsx              # Grafico ad anello/radiale
├── BarChart.tsx                # Grafico a barre (verticale/orizzontale)
├── AreaChart.tsx               # Grafico ad area
├── LineChart.tsx               # Grafico a linee (AGGIUNTO)
├── GaugeChart.tsx              # Grafico a gauge/progress (AGGIUNTO)
├── SparklineChart.tsx          # Mini grafico inline (AGGIUNTO)
├── RadarChart.tsx              # Grafico radar/spider (AGGIUNTO - opzionale)
└── hooks/
    └── useChartTheme.ts        # Hook per colori tema
```

---

## Tipi di Grafico

| Tipo          | Uso Principale                                   | Priorità |
| ------------- | ------------------------------------------------ | -------- |
| **Pie**       | Distribuzione percentuale (es. stato documenti)  | Alta     |
| **Donut**     | Come Pie ma con spazio centrale per totale/label | Alta     |
| **Bar**       | Confronto tra categorie (es. documenti per mese) | Alta     |
| **Area**      | Trend nel tempo con enfasi sul volume            | Media    |
| **Line**      | Trend nel tempo, confronto serie                 | Alta     |
| **Gauge**     | Progresso/completamento (es. crediti usati)      | Media    |
| **Sparkline** | Trend compatto inline in tabelle/card            | Media    |
| **Radar**     | Confronto multi-dimensionale (opzionale)         | Bassa    |

---

## TypeScript Interfaces

```typescript
// types.ts

/**
 * Singolo punto dati
 */
export interface ChartDataPoint {
  id: string;
  label: string;
  value: number;
  color?: string; // Colore specifico per questo punto
  metadata?: Record<string, unknown>; // Dati extra per tooltip
}

/**
 * Serie di dati (per grafici multi-serie)
 */
export interface ChartSeries {
  id: string;
  name: string;
  data: ChartDataPoint[];
  color?: string; // Colore della serie
  type?: "line" | "bar" | "area"; // Per grafici misti
}

/**
 * Props comuni a tutti i grafici
 */
export interface BaseChartProps {
  // === DATI ===
  data: ChartDataPoint[] | ChartSeries[];

  // === DIMENSIONI ===
  width?: number | string; // Default: '100%'
  height?: number; // Default: 300

  // === TITOLO E DESCRIZIONE ===
  title?: string;
  subtitle?: string;

  // === COLORI ===
  backgroundColor?: string; // Default: 'transparent'
  colors?: string[]; // Palette colori (override tema)

  // === VISIBILITÀ ELEMENTI ===
  showLegend?: boolean; // Default: true
  showTooltip?: boolean; // Default: true
  showDataLabels?: boolean; // Valori sui punti/barre
  showGrid?: boolean; // Griglia di sfondo
  showAxis?: boolean; // Assi X/Y (per bar/line/area)

  // === ASSI (per grafici cartesiani) ===
  xAxisLabel?: string;
  yAxisLabel?: string;
  xAxisValues?: string[] | number[]; // Override valori asse X
  yAxisDomain?: [number, number]; // Range asse Y [min, max]

  // === ANIMAZIONI ===
  animated?: boolean; // Default: true
  animationDuration?: number; // Default: 300ms

  // === INTERATTIVITÀ ===
  onDataPointClick?: (point: ChartDataPoint, index: number) => void;
  onLegendItemClick?: (item: ChartDataPoint, index: number) => void; // Click su singolo item della leggenda
  onSeriesToggle?: (seriesId: string, visible: boolean) => void; // Toggle visibilità serie (multi-serie)

  // === STATI ===
  loading?: boolean;
  emptyMessage?: string; // Default: 'Nessun dato disponibile'

  // === ACCESSIBILITÀ ===
  ariaLabel?: string;

  // === STILE ===
  className?: string;
}

/**
 * Props specifiche per Pie/Donut
 */
export interface PieChartProps extends BaseChartProps {
  innerRadius?: number; // 0 = pie, >0 = donut
  padAngle?: number; // Spazio tra fette
  cornerRadius?: number; // Arrotondamento fette
  centerLabel?: string; // Testo al centro (solo donut)
  centerValue?: string | number;
}

/**
 * Props specifiche per Bar
 */
export interface BarChartProps extends BaseChartProps {
  orientation?: "vertical" | "horizontal";
  stacked?: boolean;
  barSize?: number;
  barGap?: number;
  barCategoryGap?: number;
}

/**
 * Props specifiche per Line/Area
 */
export interface LineChartProps extends BaseChartProps {
  curved?: boolean; // Linee curve vs rette
  strokeWidth?: number;
  showDots?: boolean;
  fillArea?: boolean; // true = Area chart
  fillOpacity?: number;
}

/**
 * Props specifiche per Gauge
 */
export interface GaugeChartProps extends Omit<BaseChartProps, "data"> {
  value: number;
  min?: number; // Default: 0
  max?: number; // Default: 100
  thresholds?: Array<{
    value: number;
    color: string;
    label?: string;
  }>;
  showPercentage?: boolean;
  format?: (value: number) => string;
}

/**
 * Props specifiche per Sparkline
 */
export interface SparklineChartProps {
  data: number[];
  width?: number; // Default: 100
  height?: number; // Default: 30
  color?: string;
  showMinMax?: boolean;
  showLastValue?: boolean;
}
```

---

## Componente Unificato (Entry Point)

Puoi usare un singolo componente `<Chart />` che seleziona il tipo tramite prop:

```tsx
// Chart.tsx
"use client";

import { lazy, Suspense } from "react";
import type {
  BaseChartProps,
  PieChartProps,
  BarChartProps,
  LineChartProps,
  GaugeChartProps,
  SparklineChartProps,
} from "./types";
import { Loader2 } from "lucide-react";

// Lazy loading per bundle splitting
const PieChart = lazy(() =>
  import("./PieChart").then((m) => ({ default: m.PieChart }))
);
const DonutChart = lazy(() =>
  import("./DonutChart").then((m) => ({ default: m.DonutChart }))
);
const BarChart = lazy(() =>
  import("./BarChart").then((m) => ({ default: m.BarChart }))
);
const LineChart = lazy(() =>
  import("./LineChart").then((m) => ({ default: m.LineChart }))
);
const AreaChart = lazy(() =>
  import("./AreaChart").then((m) => ({ default: m.AreaChart }))
);
const GaugeChart = lazy(() =>
  import("./GaugeChart").then((m) => ({ default: m.GaugeChart }))
);
const SparklineChart = lazy(() =>
  import("./SparklineChart").then((m) => ({ default: m.SparklineChart }))
);
const RadarChart = lazy(() =>
  import("./RadarChart").then((m) => ({ default: m.RadarChart }))
);

// Tipi disponibili
export type ChartType =
  | "pie"
  | "donut"
  | "bar"
  | "line"
  | "area"
  | "gauge"
  | "sparkline"
  | "radar";

// Props unificate con discriminated union
export type ChartProps =
  | ({ type: "pie" | "donut" } & PieChartProps)
  | ({ type: "bar" } & BarChartProps)
  | ({ type: "line" | "area" } & LineChartProps)
  | ({ type: "gauge" } & GaugeChartProps)
  | ({ type: "sparkline" } & SparklineChartProps)
  | ({ type: "radar" } & BaseChartProps);

const ChartLoader = () => (
  <div className="flex h-[200px] items-center justify-center">
    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
  </div>
);

export function Chart({ type, ...props }: ChartProps) {
  return (
    <Suspense fallback={<ChartLoader />}>
      {type === "pie" && <PieChart {...(props as PieChartProps)} />}
      {type === "donut" && <DonutChart {...(props as PieChartProps)} />}
      {type === "bar" && <BarChart {...(props as BarChartProps)} />}
      {type === "line" && <LineChart {...(props as LineChartProps)} />}
      {type === "area" && <AreaChart {...(props as LineChartProps)} fillArea />}
      {type === "gauge" && <GaugeChart {...(props as GaugeChartProps)} />}
      {type === "sparkline" && (
        <SparklineChart {...(props as SparklineChartProps)} />
      )}
      {type === "radar" && <RadarChart {...(props as BaseChartProps)} />}
    </Suspense>
  );
}
```

### Utilizzo Componente Unificato

```tsx
import { Chart } from '@/components/molecules/charts'

// Donut chart
<Chart
  type="donut"
  title="Stato Documenti"
  data={documentStats}
  centerValue={total}
/>

// Bar chart
<Chart
  type="bar"
  title="Upload Mensili"
  data={monthlyData}
  orientation="vertical"
  stacked
/>

// Line chart
<Chart
  type="line"
  title="Trend Attività"
  data={activityData}
  curved
  showDots
/>

// Area chart (usa LineChart con fillArea=true)
<Chart
  type="area"
  title="Utilizzo Crediti"
  data={creditData}
  fillOpacity={0.3}
/>

// Gauge
<Chart
  type="gauge"
  title="Crediti Rimanenti"
  value={75}
  max={100}
  thresholds={[
    { value: 30, color: '#ef4444' },
    { value: 70, color: '#f59e0b' },
    { value: 100, color: '#22c55e' },
  ]}
/>

// Sparkline (inline, senza titolo)
<Chart
  type="sparkline"
  data={[10, 25, 15, 30, 22, 35]}
  width={80}
  height={24}
/>
```

### Due Approcci: Quale Scegliere?

| Approccio                                     | Pro                                                             | Contro                                          | Quando usare                     |
| --------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------- | -------------------------------- |
| **Componente unificato** `<Chart type="...">` | Un solo import, API consistente, lazy loading automatico        | Props meno tipizzate, autocomplete meno preciso | Dashboard con molti tipi diversi |
| **Componenti separati** `<DonutChart>`        | TypeScript più preciso, tree-shaking migliore, props specifiche | Più import                                      | Quando usi pochi tipi specifici  |

**Consiglio**: Esporta entrambi e lascia scegliere allo sviluppatore:

```tsx
// index.ts
export { Chart } from "./Chart";
export type { ChartProps, ChartType } from "./Chart";

// Export singoli per import diretto
export { PieChart } from "./PieChart";
export { DonutChart } from "./DonutChart";
export { BarChart } from "./BarChart";
export { LineChart } from "./LineChart";
export { AreaChart } from "./AreaChart";
export { GaugeChart } from "./GaugeChart";
export { SparklineChart } from "./SparklineChart";
export { RadarChart } from "./RadarChart";

// Types
export * from "./types";
```

---

## Esempio Componente Base

```tsx
// BaseChart.tsx
"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface BaseChartWrapperProps {
  title?: string;
  subtitle?: string;
  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
  className?: string;
  children: ReactNode;
}

export function BaseChartWrapper({
  title,
  subtitle,
  loading,
  empty,
  emptyMessage = "Nessun dato disponibile",
  className,
  children,
}: BaseChartWrapperProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-4", className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex h-[200px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : empty ? (
        <div className="flex h-[200px] items-center justify-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
```

---

## Esempio DonutChart

```tsx
// DonutChart.tsx
"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { BaseChartWrapper } from "./BaseChart";
import { useChartTheme } from "./hooks/useChartTheme";
import type { PieChartProps, ChartDataPoint } from "./types";

export function DonutChart({
  data,
  title,
  subtitle,
  width = "100%",
  height = 300,
  innerRadius = 60,
  colors,
  showLegend = true,
  showTooltip = true,
  showDataLabels = false,
  centerLabel,
  centerValue,
  loading,
  onDataPointClick,
  onLegendItemClick, // Click su singolo item della leggenda
  className,
}: PieChartProps) {
  const theme = useChartTheme();
  const chartColors = colors || theme.colors;

  const isEmpty = !data || data.length === 0;

  return (
    <BaseChartWrapper
      title={title}
      subtitle={subtitle}
      loading={loading}
      empty={isEmpty}
      className={className}
    >
      <ResponsiveContainer width={width} height={height}>
        <PieChart>
          <Pie
            data={data as ChartDataPoint[]}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius="80%"
            paddingAngle={2}
            onClick={(_, index) =>
              onDataPointClick?.(data[index] as ChartDataPoint, index)
            }
            label={
              showDataLabels
                ? ({ label, percent }) =>
                    `${label}: ${(percent * 100).toFixed(0)}%`
                : undefined
            }
          >
            {(data as ChartDataPoint[]).map((entry, index) => (
              <Cell
                key={entry.id}
                fill={entry.color || chartColors[index % chartColors.length]}
                className="cursor-pointer transition-opacity hover:opacity-80"
              />
            ))}
          </Pie>

          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const item = payload[0].payload as ChartDataPoint;
                return (
                  <div className="rounded-lg border bg-popover p-2 shadow-md">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.value.toLocaleString()}
                    </p>
                  </div>
                );
              }}
            />
          )}

          {showLegend && (
            <Legend
              verticalAlign="bottom"
              formatter={(value, entry, index) => (
                <span
                  className="text-sm text-foreground cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLegendItemClick?.(data[index] as ChartDataPoint, index);
                  }}
                >
                  {value}
                </span>
              )}
            />
          )}

          {/* Centro del donut */}
          {(centerLabel || centerValue) && (
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
              {centerValue && (
                <tspan
                  x="50%"
                  dy="-0.5em"
                  className="text-2xl font-bold fill-foreground"
                >
                  {centerValue}
                </tspan>
              )}
              {centerLabel && (
                <tspan
                  x="50%"
                  dy="1.5em"
                  className="text-sm fill-muted-foreground"
                >
                  {centerLabel}
                </tspan>
              )}
            </text>
          )}
        </PieChart>
      </ResponsiveContainer>
    </BaseChartWrapper>
  );
}
```

---

## Hook per Tema Colori

```tsx
// hooks/useChartTheme.ts
"use client";

import { useMemo } from "react";

// Palette colori coerente con il design system
const CHART_COLORS = {
  primary: [
    "hsl(var(--chart-1))", // Definiti in globals.css
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ],
  semantic: {
    success: "hsl(var(--success))",
    warning: "hsl(var(--warning))",
    error: "hsl(var(--destructive))",
    info: "hsl(var(--primary))",
  },
  gradient: {
    primary: ["#6366f1", "#8b5cf6", "#a855f7"],
    success: ["#22c55e", "#10b981", "#14b8a6"],
    warm: ["#f97316", "#f59e0b", "#eab308"],
  },
};

export function useChartTheme() {
  return useMemo(
    () => ({
      colors: CHART_COLORS.primary,
      semantic: CHART_COLORS.semantic,
      gradients: CHART_COLORS.gradient,

      // Stili comuni
      tooltip: {
        backgroundColor: "hsl(var(--popover))",
        borderColor: "hsl(var(--border))",
        textColor: "hsl(var(--popover-foreground))",
      },
      grid: {
        stroke: "hsl(var(--border))",
        strokeDasharray: "3 3",
      },
      axis: {
        stroke: "hsl(var(--muted-foreground))",
        fontSize: 12,
      },
    }),
    []
  );
}
```

---

## Esempio Utilizzo in AI Studio

```tsx
// In AIStudioDashboard.tsx
import {
  DonutChart,
  BarChart,
  LineChart,
  GaugeChart,
} from "@/components/molecules/charts";

function AIStudioDashboard({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Distribuzione stato documenti */}
      <DonutChart
        title="Stato Documenti"
        data={[
          {
            id: "1",
            label: "Completati",
            value: stats.completed,
            color: "#22c55e",
          },
          {
            id: "2",
            label: "In Elaborazione",
            value: stats.processing,
            color: "#f59e0b",
          },
          { id: "3", label: "Falliti", value: stats.failed, color: "#ef4444" },
        ]}
        centerValue={stats.total}
        centerLabel="Totale"
        height={250}
        onDataPointClick={(point) => console.log("Clicked slice:", point)}
        onLegendItemClick={(item) => {
          // Esempio: filtra documenti per stato
          router.push(`/documents?status=${item.id}`);
        }}
      />

      {/* Documenti per mese */}
      <BarChart
        title="Documenti Caricati"
        subtitle="Ultimi 6 mesi"
        data={stats.monthlyUploads}
        showGrid
        height={250}
      />

      {/* Crediti utilizzati */}
      <GaugeChart
        title="Crediti Utilizzati"
        value={stats.creditsUsed}
        max={stats.creditsTotal}
        thresholds={[
          { value: 50, color: "#22c55e", label: "OK" },
          { value: 80, color: "#f59e0b", label: "Attenzione" },
          { value: 100, color: "#ef4444", label: "Limite" },
        ]}
        showPercentage
        height={200}
      />

      {/* Trend attività */}
      <LineChart
        title="Attività Settimanale"
        data={stats.weeklyActivity}
        curved
        showDots
        fillArea
        fillOpacity={0.2}
        className="col-span-full lg:col-span-2"
        height={300}
      />
    </div>
  );
}
```

---

## Checklist Implementazione

- [ ] Installare `recharts`
- [ ] Creare cartella `src/components/molecules/charts/`
- [ ] Creare `types.ts` con tutte le interface
- [ ] Creare `BaseChart.tsx` wrapper
- [ ] Creare `hooks/useChartTheme.ts`
- [ ] Implementare grafici in ordine di priorità:
  - [ ] `DonutChart.tsx`
  - [ ] `PieChart.tsx`
  - [ ] `BarChart.tsx`
  - [ ] `LineChart.tsx`
  - [ ] `AreaChart.tsx`
  - [ ] `GaugeChart.tsx`
  - [ ] `SparklineChart.tsx`
- [ ] Creare `index.ts` barrel export
- [ ] Aggiungere variabili CSS per colori grafici in `globals.css`
- [ ] Testare responsive su mobile
- [ ] Integrare in AI Studio

---

## Note Aggiuntive

1. **Performance**: Per dataset grandi (>1000 punti), considerare:

   - Downsampling dei dati
   - Canvas invece di SVG (usare Chart.js)
   - Virtualizzazione

2. **Accessibilità**:

   - Aggiungere `aria-label` descrittivi
   - Supportare navigazione keyboard per tooltip
   - Pattern/texture oltre ai colori per daltonici

3. **Testing**:

   - Unit test con Vitest
   - Visual regression con Storybook/Chromatic

4. **Export**:
   - Considerare funzione `downloadAsImage()` per esportare grafici
