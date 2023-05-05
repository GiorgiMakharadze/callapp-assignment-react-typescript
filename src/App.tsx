import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import useDataStore from "./store";
import Loading from "./components/Loading";

const DataTable = React.lazy(() => import("./pages/DataTable"));
const PieChart = React.lazy(() => import("./pages/PieChart"));

function App() {
  const { data } = useDataStore((state: any) => ({
    data: state.data,
  }));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <DataTable />
            </Suspense>
          }
        />
        <Route
          path="/chart"
          element={
            <Suspense fallback={<Loading />}>
              <PieChart pieData={data} />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
