import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Form, message, Typography, Space, Input } from "antd";
import useDataStore from "../store";
import UpdateModal from "../components/UpdateModal";
import AddModal from "../components/AddModal";
import { IData } from "../../types/zustandTypes";
import { columns } from "../components/collumns";
import styles from "../index.module.scss";

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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [updatedData, setUpdatedData] = useState<IData | undefined>(undefined);
  const [searchValue, setSearchValue] = useState("");
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
      message.success({
        content: <Typography.Text>Data added successfully.</Typography.Text>,
        duration: 5,
      });
      const lastPage = Math.ceil((data.length + 1) / 9);
      setCurrentPage(lastPage);
    } catch (error) {
      console.log(error);
    }
  };

  const [column, ,] = useState<Array<any>>(columns({ deleteData }));

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const rowClassName = () => styles.row;

  const filteredData = data.filter((record) => {
    const searchRegex = new RegExp(searchValue, "i");
    return searchRegex.test(record.name) || searchRegex.test(record.email);
  });

  return (
    <>
      <Space className={styles.search}>
        <Input
          placeholder="Enter search data"
          className={styles.search_input}
          onChange={(e) => setSearchValue(e.target.value)}
          onInput={(e) => {
            const regex = /^[a-zA-Z]*$/;
            if (!regex.test(e.currentTarget.value)) {
              e.currentTarget.value = e.currentTarget.value.replace(
                /[^a-zA-Z]/g,
                ""
              );
            }
          }}
        />
      </Space>
      <Table
        columns={column}
        dataSource={filteredData}
        bordered
        pagination={{
          current: currentPage,
          showSizeChanger: true,
          showQuickJumper: true,
          className: `${styles["custom-pagination"]}`,
          onChange: (page) => setCurrentPage(page),
        }}
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
    </>
  );
};

export default DataTable;
