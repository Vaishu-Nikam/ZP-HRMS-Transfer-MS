
import { Toaster } from "react-hot-toast";
import { AppRouter } from "./router";

function App() {
  return (
    <div className="h-full">
      <Toaster position="top-center" />
      <AppRouter />
    </div>
  );
}

export default App;