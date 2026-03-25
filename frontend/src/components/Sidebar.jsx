export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-black/40 backdrop-blur-xl border-r border-green-500 p-5">
      <h1 className="text-2xl text-green-400 font-bold mb-8">
        ⚡ IDS Panel
      </h1>

      <ul className="space-y-4">
        <li className="hover:text-green-400 cursor-pointer">Dashboard</li>
        <li className="hover:text-green-400 cursor-pointer">Analytics</li>
        <li className="hover:text-green-400 cursor-pointer">Logs</li>
      </ul>
    </div>
  );
}