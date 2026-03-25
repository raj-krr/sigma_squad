import { useEffect, useState } from "react";
import { socket } from "../socket";
import AttackChart from "../components/AttackChart";
import AttackPie from "../components/AttackPie";
import AlertCard from "../components/AlertCard";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [attackTypes, setAttackTypes] = useState({});

  useEffect(() => {
    socket.on("alert", (data) => {
      const time = new Date().toLocaleTimeString();

      setAlerts((prev) => [data, ...prev]);

      // line chart
      setChartData((prev) => [
        ...prev.slice(-10),
        { time, count: prev.length + 1 },
      ]);

      // pie chart
      setAttackTypes((prev) => {
        const updated = { ...prev };
        updated[data.attackType] =
          (updated[data.attackType] || 0) + 1;
        return updated;
      });
    });

    return () => socket.off("alert");
  }, []);

  const pieData = Object.keys(attackTypes).map((key) => ({
    type: key,
    value: attackTypes[key],
  }));

  return (
    <div className="p-6 flex-1">

      {/* TOP */}
      <h1 className="text-3xl text-green-400 mb-6">
        ⚡ Cyber Threat Dashboard
      </h1>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <AttackChart data={chartData} />
        <AttackPie data={pieData} />
      </div>

      {/* ALERTS */}
      <div>
        <h2 className="text-xl mb-3">🚨 Live Alerts</h2>

        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {alerts.map((alert, i) => (
            <AlertCard key={i} alert={alert} />
          ))}
        </div>
      </div>

    </div>
  );
}