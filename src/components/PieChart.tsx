import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Pie } from "@ant-design/plots";
import { IData } from "../../types/zustandTypes";

type PieChartProps = {
  datas: IData[];
};

const PieChart: React.FC<PieChartProps> = ({ datas }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const cityData = datas.reduce((acc: any, cur) => {
    const city = cur.address.city;
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(cityData).map(([city, count]) => ({
    type: city,
    value: count,
  }));

  const config = {
    appendPadding: 10,
    data: chartData,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <>
      <div>
        <Pie {...config} />
        <Button type="primary" onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
    </>
  );
};

export default PieChart;
