import { IData } from "./zustandTypes";

export interface IAddModalProps {
  isAddModalOpen: boolean;
  handleAddOk: (values: any) => Promise<void>;
  handleClose: () => void;
  addForm: any;
}

export interface IUpdateModalProps {
  isUpdateModalOpen: boolean;
  updatedData: IData | undefined;
  handleOk: (values: any) => Promise<void>;
  handleCancel: () => void;
  updateForm: any;
}
