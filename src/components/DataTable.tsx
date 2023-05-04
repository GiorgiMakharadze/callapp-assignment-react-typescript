import { useEffect } from "react";
import useDataStore from "../store";
import { Table } from "antd";
import styles from "../styles/dataTable.module.scss";

const DataTable = () => {
  const { data, fetchData } = useDataStore((state) => ({
    data: state.data,
    fetchData: state.fetchData,
  }));

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Street",
      dataIndex: ["address", "street"],
      key: "street",
    },
    {
      title: "City",
      dataIndex: ["address", "city"],
      key: "city",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  return (
    <Table
      className={styles.myTable}
      dataSource={data}
      columns={columns}
      rowKey="id"
    />
  );
};

export default DataTable;
