import { useState } from "react";
import reactLogo from "./assets/react.svg";
import freedihere from "./../public/freedihare_logo.svg";
import "./App.css";
import CreateFoodForm from "./components/temp/foodForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex items-center gap-2 bg-sky-600 rounded-2xl p-2">
        <img src={freedihere} className="w-16 h-16" alt="React logo" />
        <h1 className="text-2xl font-bold">Freedihere</h1>
      </div>
      <CreateFoodForm></CreateFoodForm>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div> */}
    </>
  );
}

export default App;
