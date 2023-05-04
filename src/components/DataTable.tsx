import { useEffect, useState } from "react";
import { Table, Tag, Typography } from "antd";
import { PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import useDataStore from "../store";
import { IData } from "../../types/zustandTypes";
import styles from "../../src/dataTable.module.scss";

const DataTable = () => {
  const { data, fetchData } = useDataStore((state) => ({
    data: state.data,
    fetchData: state.fetchData,
  }));

  const [column, setColumn] = useState<Array<any>>([
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <a href="#">{text}</a>,
      align: "center",
      sorter: (a: IData, b: IData) => Number(a.id) - Number(b.id),
      style: { backgroundColor: "#000" },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
      sorter: (a: IData, b: IData) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: IData, b: IData) => a.email.localeCompare(b.email),
      render: (text: string) => (
        <Typography.Text copyable>{text}</Typography.Text>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      render: (text: string) => (
        <Tag color={text === "male" ? "red" : "orange"}>
          {text.toUpperCase()}
        </Tag>
      ),
      sorter: (a: IData, b: IData) => a.gender.localeCompare(b.gender),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: { street: string; city: string }) => (
        <>
          <div>
            <EnvironmentOutlined /> {address.city}
          </div>
          <div>{address.street}</div>
        </>
      ),
      sorter: (a: IData, b: IData) =>
        a.address.city.localeCompare(b.address.city) ||
        a.address.street.localeCompare(b.address.street),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text: string) => (
        <a href={`tel:${text}`}>
          <PhoneOutlined /> {text}
        </a>
      ),
      align: "center",
    },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const tableStyle = {
    margin: "20px 20px",
    maxWidth: "100%",
  };
  return (
    <Table
      columns={column}
      dataSource={data}
      pagination={{ pageSize: 9, showSizeChanger: true }}
      style={tableStyle}
    />
  );
};

export default DataTable;
// import React, { useState } from 'react';
// import { Button, Modal } from 'antd';

// const App: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <Button type="primary" onClick={showModal}>
//         Open Modal
//       </Button>
//       <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//       </Modal>
//     </>
//   );
// };

// export default App;
