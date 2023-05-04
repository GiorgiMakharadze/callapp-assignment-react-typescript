import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chart" element={<div>CHART PAGE</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
