import { useState } from "preact/hooks";

export default function App() {
	const [count, setCount] = useState(3);

	return (
		<>
			<div> Count is {count} </div>
			<button type="button" onClick={() => setCount((count) => count + 1)}>
				+
			</button>
			<button type="button" onClick={() => setCount((count) => count - 1)}>
				-
			</button>
		</>
	);
}
