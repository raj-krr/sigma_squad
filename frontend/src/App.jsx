import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    
    <div className="flex bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;