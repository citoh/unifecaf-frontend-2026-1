import { memo } from "react";

function Filho({ nome }) {
  console.log("Renderizou Filho");
  return <p>{nome}</p>;
}

export default memo(Filho);