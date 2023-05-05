import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography } from "antd";
import { Pie } from "@ant-design/plots";
import { LeftOutlined } from "@ant-design/icons";
import useDataStore from "../store";
import { IData } from "../../types/zustandTypes";
import styles from "../index.module.scss";

type PieChartProps = {
  pieData: IData[];
};

const PieChart: React.FC<PieChartProps> = ({ pieData }) => {
  const { fetchData } = useDataStore((state: any) => ({
    fetchData: state.fetchData,
  }));

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (pieData.length === 0) {
      fetchData();
    }
  }, [pieData, fetchData]);

  const cityData = pieData.reduce((acc: any, cur) => {
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
    colors: [
      "#1976d2",
      "#ef5350",
      "#ab47bc",
      "#7e57c2",
      "#5c6bc0",
      "#26a69a",
      "#ffa726",
    ],
    legend: { position: "right" as const },
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    tooltip: {
      showMarkers: false,
      formatter: (datum: any) => {
        const total = chartData.reduce(
          (acc: number, cur: any) => acc + cur.value,
          0
        );
        const percent = (datum.value / total) * 100;
        return {
          name: datum.type,
          value: `${datum.value} (${percent.toFixed(2)}%)`,
        };
      },
    },
    interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
  };

  return (
    <>
      <div className={styles.pie_container}>
        <Typography.Title level={2}>People Percentage by City</Typography.Title>
        <Card className={styles.chart_container}>
          <Pie {...config} />
          <Button type="primary" onClick={handleGoBack} icon={<LeftOutlined />}>
            Go Back
          </Button>
        </Card>
      </div>
    </>
  );
};

export default PieChart;
