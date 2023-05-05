import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Form } from "antd";
import useDataStore from "../store";
import UpdateModal from "../components/UpdateModal";
import AddModal from "../components/AddModal";
import { IData } from "../../types/zustandTypes";
import styles from "../index.module.scss";
import { columns } from "../components/collumns";

const DataTable = () => {
  const { data, fetchData, createData, deleteData, updateData } = useDataStore(
    (state) => ({
      data: state.data,
      fetchData: state.fetchData,
      deleteData: state.deleteData,
      updateData: state.updateData,
      createData: state.createData,
    })
  );

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [updatedData, setUpdatedData] = useState<IData | undefined>(undefined);
  const [updateForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const navigate = useNavigate();

  const goToChart = () => {
    navigate("/chart");
  };

  const showModal = (record: IData) => {
    updateForm.setFieldsValue(record);
    setIsUpdateModalOpen(true);
  };

  const showAddModal = () => {
    addForm.resetFields();
    setIsAddModalOpen(true);
  };

  const handleOk = async (values: any) => {
    try {
      if (!updatedData) {
        throw new Error("No data to update");
      }
      await updateData(Number(updatedData?.id) || 0, values);
      setIsUpdateModalOpen(false);
      console.log("Data updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsUpdateModalOpen(false);
    setUpdatedData(undefined);
  };

  const handleAddData = () => {
    showAddModal();
  };

  const handleAddOk = async (values: any) => {
    try {
      await createData(values);
      setIsAddModalOpen(false);
      console.log("Data added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const [column, ,] = useState<Array<any>>(columns({ deleteData }));

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const rowClassName = () => styles.row;

  return (
    <div>
      <Table
        columns={column}
        dataSource={data}
        bordered
        pagination={{ pageSize: 9 }}
        rowClassName={rowClassName}
        onRow={(record) => ({
          onDoubleClick: () => {
            setUpdatedData(record);
            showModal(record);
          },
        })}
        footer={() => (
          <div className={styles.table_footer}>
            <Button type="primary" onClick={showAddModal}>
              Add Data
            </Button>
            <Button type="default" onClick={goToChart}>
              Go to chart
            </Button>
          </div>
        )}
      />
      <UpdateModal
        isUpdateModalOpen={isUpdateModalOpen}
        updatedData={updatedData}
        handleOk={handleOk}
        handleCancel={handleCancel}
        updateForm={updateForm}
      />
      <AddModal
        isAddModalOpen={isAddModalOpen}
        handleAddOk={handleAddOk}
        handleClose={() => setIsAddModalOpen(false)}
        addForm={addForm}
      />
    </div>
  );
};

export default DataTable;
