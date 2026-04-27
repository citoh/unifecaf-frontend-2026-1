import { createContext, useContext } from "react";
const TemaContext = createContext();

function Filho() {
  const tema = useContext(TemaContext);
  return <p>Tema: {tema}</p>;
}

export default function App() {
  return (
    <TemaContext.Provider value="dark">
      <Filho />
    </TemaContext.Provider>
  );
}

