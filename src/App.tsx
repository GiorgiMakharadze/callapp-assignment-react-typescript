import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PieChart from "./components/PieChart";
import useDataStore from "./store";

function App() {
  const { data } = useDataStore((state: any) => ({
    data: state.data,
  }));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chart" element={<PieChart datas={data} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
