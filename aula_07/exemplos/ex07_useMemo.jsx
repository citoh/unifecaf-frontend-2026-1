import { useMemo, useState } from "react";

export default function App() {

  const [count, setCount] = useState(0);

  const valorPesado = useMemo(() => {
    console.log("Calculando...");
    return count * 1000;
  }, [count]);

  return (
    <div>
      <p>{valorPesado}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

