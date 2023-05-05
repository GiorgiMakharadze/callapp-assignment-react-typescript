import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 74 }} spin />;

const Loading = () => <Spin indicator={antIcon} />;

export default Loading;
