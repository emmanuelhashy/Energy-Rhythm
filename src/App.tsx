import LineChart from "./components/chart/CurvedLineChart";
import { energyData, highlights } from "./utils/data";
import "./App.css";
import {
  getCurrentFactAndRecommendation,
  getCurrentLabel,
} from "./utils/helper";
import Calendar from "./components/icons/Calendar";

export default function App() {
  const currentLabel = getCurrentLabel(highlights);
  const info = getCurrentFactAndRecommendation(currentLabel);

  return (
    <div className="w-full pt-8 px-16">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">Energy Rhythm</h2>
        <div className="border cursor-pointer border-white px-2 py-1.5 rounded-md flex items-center gap-2">
          <Calendar/>
          <p>See your schedule</p>
        </div>
      </div>
      <p className="text-lg font-medium text-[#4287f5]"> {info.fact}</p>
      <p className="text-base text-[#b5703d]"> {info.recommendation}</p>
      <LineChart
        data={energyData}
        highlights={highlights}
        width={1300}
        height={650}
      />
    </div>
  );
}