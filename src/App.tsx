import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataTable from "./pages/DataTable";
import PieChart from "./pages/PieChart";
import useDataStore from "./store";

function App() {
  const { data } = useDataStore((state: any) => ({
    data: state.data,
  }));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DataTable />} />
        <Route path="/chart" element={<PieChart pieData={data} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
