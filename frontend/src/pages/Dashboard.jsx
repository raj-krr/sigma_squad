import { useEffect, useState } from "react";
import { socket } from "../socket";
import AttackChart from "../components/AttackChart";
import AttackPie from "../components/AttackPie";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [attackTypes, setAttackTypes] = useState({});

  useEffect(() => {
    socket.on("traffic", (data) => {
      const time = new Date().toLocaleTimeString();

      // 🔥 keep only latest 20 logs
      setAlerts((prev) => [data, ...prev.slice(0, 20)]);

      // 📊 line chart
      setChartData((prev) => [
        ...prev.slice(-10),
        { time, count: prev.length + 1 },
      ]);

      // 🧠 pie chart
      setAttackTypes((prev) => {
        const updated = { ...prev };
        updated[data.attackType] =
          (updated[data.attackType] || 0) + 1;
        return updated;
      });
    });

    return () => socket.off("traffic");
  }, []);

  // 🎯 pie chart data
  const pieData = Object.keys(attackTypes).map((key) => ({
    type: key,
    value: attackTypes[key],
  }));

  // 🧠 system status
  const isUnderAttack = alerts.some((a) => a.anomaly);

  return (
    <div className="p-6 flex-1">

      {/* HEADER */}
      <h1 className="text-3xl text-green-400 mb-4">
        ⚡ Cyber Threat Dashboard
      </h1>

      {/* SYSTEM STATUS */}
      <div
        className={`mb-6 p-4 rounded-xl border ${
          isUnderAttack
            ? "bg-red-500/10 border-red-500"
            : "bg-green-500/10 border-green-500"
        }`}
      >
        <p
          className={`text-xl font-bold ${
            isUnderAttack ? "text-red-400" : "text-green-400"
          }`}
        >
          {isUnderAttack ? "🚨 UNDER ATTACK" : "🟢 SYSTEM SAFE"}
        </p>
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <AttackChart data={chartData} />
        <AttackPie data={pieData} />
      </div>

      {/* ALERTS */}
      <div>
        <h2 className="text-xl mb-3">📡 Live Traffic</h2>

        <div className="space-y-3 max-h-[350px] overflow-y-auto">
          {alerts.map((alert, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border transition ${
                alert.anomaly
                  ? "bg-red-500/10 border-red-500"
                  : "bg-green-500/10 border-green-500"
              }`}
            >
              <p
                className={`font-bold ${
                  alert.anomaly ? "text-red-400" : "text-green-400"
                }`}
              >
                {alert.anomaly
                  ? `🚨 ${alert.attackType}`
                  : "🟢 Normal Traffic"}
              </p>

              <p className="text-sm text-gray-300">
                {new Date(alert.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}