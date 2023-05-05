import PieChart from "../components/PieChart";
import useDataStore from "../store";

const Chart = () => {
  const { data } = useDataStore((state: any) => ({
    data: state.data,
  }));
  return <PieChart datas={data} />;
};

export default Chart;
