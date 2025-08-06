# 📈 Curved LineChart Component

A highly customizable and animated curved line chart built with **React**, **TypeScript**, and **D3.js**.  
It visualizes **energy levels over time**, highlights time blocks (e.g., focus, rest), and includes a real-time indicator line for the current time.

---

## ✨ Features

- Vertical time-based axis (Time of Day)
- Smooth energy curve using `d3.curveBasis`
- Gradient-colored line based on energy level
- Background time sections with custom labels
- Real-time line indicator showing the current time
- Animated line drawing on load
- Customizable dimensions
- Fully typed with TypeScript

---

## Use Cases

- Daily energy/activity visualization
- Productivity tracking dashboards
- Sleep/wake cycle visualization
- Wellness and habit apps

---

## 📦 Props

```ts
interface DataPoint {
  time: Date;
  level: number; // between 0 and 1
}

interface Highlight {
  time: Date;
  label: string;
  color: string;
}

interface LineChartProps {
  data: DataPoint[];
  highlights: Highlight[];
  width?: number;  // default: 400
  height?: number; // default: 800
}
```

## Usage

```ts
import LineChart from './components/LineChart';
import { sampleData, sampleHighlights } from './utils/sample';

export default function App() {
  return (
    <div>
      <h1>Energy Timeline</h1>
      <LineChart data={sampleData} highlights={sampleHighlights} width={500} height={1000} />
    </div>
  );
}
```

## ⚙️ Getting Started

This component requires Node.js v20 and above.

Clone the repository and run the following commands to see the final version of the component:

```bash
cd "repo-name"
npm install
npm run dev
```

This will start the development server, and you can view the chart in your browser at <http://localhost:3000>.
