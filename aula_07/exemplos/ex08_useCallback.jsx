import { useCallback, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  const incrementar = useCallback(() => {
    console.log("Função criada");
    setCount(c => c + 1);
  }, []);

  return <button onClick={incrementar}>{count}</button>;
}

