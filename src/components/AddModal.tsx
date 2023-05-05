import { Form, Input, Modal, Select } from "antd";
import { IAddModalProps } from "../../types/modalPropTyeps";
import Option from "antd/lib/select";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const AddModal: React.FC<IAddModalProps> = ({
  isAddModalOpen,
  handleAddOk,
  handleClose,
  addForm,
}) => {
  return (
    <Modal
      title="Add Data"
      open={isAddModalOpen}
      onOk={() => addForm.submit()}
      onCancel={handleClose}
    >
      <Form form={addForm} onFinish={handleAddOk}>
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
          rules={[
            { required: true, message: "Please input your email!" },
            {
              pattern: emailRegex,
              message: "Please enter a valid email address!",
            },
            {
              max: 50,
              message: "Email must be at most 50 characters long!",
            },
          ]}
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
          rules={[
            { required: true, message: "Please input your city!" },
            {
              min: 5,
              message: "City must be at least 5 characters long!",
            },
            {
              max: 50,
              message: "City must be at most 50 characters long!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Street"
          name={["address", "street"]}
          rules={[
            { required: true, message: "Please input your street!" },
            {
              min: 5,
              message: "Street must be at least 5 characters long!",
            },
            {
              max: 100,
              message: "Street must be at most 100 characters long!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
            { pattern: /^[\d\s()+-]*$/, message: "Please enter only numbers!" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
