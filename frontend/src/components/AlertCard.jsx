export default function AlertCard({ alert }) {
  return (
    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500 hover:scale-[1.02] transition">
      <p className="text-red-400 font-bold">
        ⚠️ {alert.attackType}
      </p>
      <p className="text-sm text-gray-300">
        {new Date(alert.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
}