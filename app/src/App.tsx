import { LuRefreshCcw } from "react-icons/lu";
import freedihere from "./../public/freedihare_logo.svg";
import "./App.css";
import CreateFoodForm from "./components/temp/foodForm";

function App() {
  return (
    <>
      <div className="flex items-center gap-2 bg-sky-600 rounded-2xl p-2">
        <img src={freedihere} className="w-16 h-16" alt="React logo" />
        <h1 className="text-2xl font-bold">Freedihare</h1>
        <button
          className="rounded-full bg-sky-300 p-2 border-sky-800 border-2"
          onClick={() => window.location.reload()}
        >
          <LuRefreshCcw />
        </button>
      </div>
      <CreateFoodForm></CreateFoodForm>
    </>
  );
}

export default App;
