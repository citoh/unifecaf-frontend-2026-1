import { useRef } from "react";

export default function InputFocus() {
  const inputRef = useRef();
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>
        Focar input
      </button>
    </div>
  );
}