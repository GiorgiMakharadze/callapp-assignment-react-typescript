import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { IData } from "../../types/zustandTypes";
import { Tag, Typography, Space, Popconfirm, Button } from "antd";
interface IColumnsProps {
  deleteData: any;
}

export const columns = ({ deleteData }: IColumnsProps) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text: string) => <Typography.Text>{text}</Typography.Text>,
    align: "center",
    sorter: (a: IData, b: IData) => Number(a.id) - Number(b.id),
    style: { backgroundColor: "#000" },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (text: string) => (
      <Typography.Text copyable>{text}</Typography.Text>
    ),
    sorter: (a: IData, b: IData) => a.name.localeCompare(b.name),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
    sorter: (a: IData, b: IData) => a.email.localeCompare(b.email),
    render: (text: string) => (
      <Typography.Text>
        <MailOutlined />{" "}
        <a href={`mailto:${text}?subject=Subject%20Line`}>{text}</a>
      </Typography.Text>
    ),
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    align: "center",
    render: (text: string) => (
      <Tag color={text === "male" ? "red" : "orange"}>{text.toUpperCase()}</Tag>
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
];
