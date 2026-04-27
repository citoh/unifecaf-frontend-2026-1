import { useState } from "react";

export function useContador() {
  const [count, setCount] = useState(0);

  function incrementar() {
    setCount(c => c + 1);
  }

  return { count, incrementar };
}

// Uso:
// const { count, incrementar } = useContador();