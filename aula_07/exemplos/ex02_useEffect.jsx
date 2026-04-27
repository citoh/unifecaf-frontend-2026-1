import { useEffect, useState } from "react";
export default function ExemploEffect() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("O contador mudou:", count);
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}