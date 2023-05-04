import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingTable from "./pages/LandingTable";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<LandingTable />} />
    //     <Route path="/chart" element={<div>CHART PAGE</div>} />
    //   </Routes>
    // </BrowserRouter>
    <LandingTable />
  );
}

export default App;
