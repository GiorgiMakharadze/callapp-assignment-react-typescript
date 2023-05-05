import { Form, Input, Modal, Select } from "antd";
import { IUpdateModalProps } from "../../types/modalPropTyeps";
import Option from "antd/lib/select";

const UpdateModal: React.FC<IUpdateModalProps> = ({
  isUpdateModalOpen,
  updatedData,
  handleOk,
  handleCancel,
  updateForm,
}) => {
  return (
    <Modal
      title="Update Data"
      open={isUpdateModalOpen}
      onOk={() => updateForm.submit()}
      onCancel={handleCancel}
    >
      <Form form={updateForm} initialValues={updatedData} onFinish={handleOk}>
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
  );
};

export default UpdateModal;
