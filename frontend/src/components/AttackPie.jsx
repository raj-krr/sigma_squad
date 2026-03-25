import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#ff4d4f", "#faad14", "#52c41a"];

export default function AttackPie({ data }) {
  return (
    <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl">
      <h2 className="mb-2">🎯 Attack Distribution</h2>

      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="type"
          outerRadius={80}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}