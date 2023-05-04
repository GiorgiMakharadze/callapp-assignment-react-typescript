import { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Typography,
  Popconfirm,
  Button,
  Space,
  Form,
  Input,
  Modal,
  Select,
} from "antd";
import Option from "antd/lib/select";
import { PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import useDataStore from "../store";
import { IData } from "../../types/zustandTypes";
import styles from "../index.module.scss";

const DataTable = () => {
  const { data, fetchData, deleteData, updateData } = useDataStore((state) => ({
    data: state.data,
    fetchData: state.fetchData,
    deleteData: state.deleteData,
    updateData: state.updateData,
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState<IData | undefined>(undefined);
  const [form] = Form.useForm();

  const showModal = (record: IData) => {
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleOk = async (values: any) => {
    try {
      if (!updatedData) {
        throw new Error("No data to update");
      }
      await updateData(Number(updatedData?.id) || 0, values);
      setIsModalOpen(false);
      console.log("Data updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUpdatedData(undefined);
  };

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
      align: "center",
      render: (text: string) => <Typography.Text>{text}</Typography.Text>,
      sorter: (a: IData, b: IData) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
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
    {
      title: "Actions",
      dataIndex: "action",
      align: "center",
      render: (_: any, record: any) => (
        <Space>
          <Popconfirm
            title="Are you sure want to delete?"
            onConfirm={() => deleteData(record.id)}
          >
            <Button danger type="primary">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const rowClassName = () => styles.row;

  return (
    <div>
      <Table
        columns={column}
        dataSource={data}
        bordered
        rowClassName={rowClassName}
        onRow={(record) => ({
          onDoubleClick: () => {
            setUpdatedData(record);
            showModal(record);
          },
        })}
      />

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <Form form={form} initialValues={updatedData} onFinish={handleOk}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select a gender!" }]}
          >
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="City"
            name={["address", "city"]}
            rules={[{ required: true, message: "Please input your city!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Street"
            name={["address", "street"]}
            rules={[{ required: true, message: "Please input your street!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataTable;
