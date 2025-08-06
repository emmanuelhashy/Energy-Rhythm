import type { parsedData } from "./helper"

export type EnergyPoint = {
  id: number
  time: string
  level: number
}

export type ParseDataPoint = {
  id: number
  time: Date
  level: number
}

export type DataPoint = ReturnType<typeof parsedData>[number];

export interface EnergyHighlight {
  time: string
  label: string
  color: string
}

export interface LineChartProps {
  data: EnergyPoint[]
  highlights: EnergyHighlight[]
  width?: number
  height?: number
}

export type Highlight = {
  time: string;
  label: string;
  color: string;
};

export type TimePeriodInfo = {
  fact: string;
  recommendation: string;
};

export type TimeLabel =
  | '🌙 Bedtime'
  | '🌄 Early Morning'
  | '🧭 Wake up'
  | '☀️ Morning Peak'
  | '📉 Midday Dip'
  | '📈 Afternoon Rebound';