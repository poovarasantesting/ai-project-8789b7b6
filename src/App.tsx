import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentPage from "./pages/PaymentPage";
import { Toaster } from "./components/Toaster";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;