import { Route, Routes } from "react-router-dom";
import ColorCodes from "./pages/ColorCodes";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<ColorCodes />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;