import { useEffect, useState } from "react";

function App() {
  const [health, setHealth] = useState<string>("Loading...");

  useEffect(() => {
    fetch("http://localhost:4000/api/health")
      .then(res => res.json())
      .then(data => setHealth(data.status))
      .catch(() => setHealth("Error"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Recipix Frontend</h1>
      <p>Backend status: <span className="font-mono">{health}</span></p>
    </div>
  );
}

export default App;
