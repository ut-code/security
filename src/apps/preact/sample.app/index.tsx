import { useRef, useState } from "preact/hooks";

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [input, setInput] = useState<string>("Count: ");
  const inputRef = useRef<HTMLInputElement | null>(null);
  console.log("rendering");

  return (
    <>
      <div>
        {input}
        {count}
      </div>
      <button type="button" onClick={() => setCount((count) => count + 1)}>
        +
      </button>
      <button type="button" onClick={() => setCount((count) => count - 1)}>
        -
      </button>
      <div>
        <input
          ref={inputRef}
          value={input}
          onKeyDown={() => {
            const val = inputRef?.current?.value;
            if (!val) return;
            setInput(val);
          }}
        />
      </div>
    </>
  );
}
