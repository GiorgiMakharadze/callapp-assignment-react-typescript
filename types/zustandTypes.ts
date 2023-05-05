export interface IData {
  id: string | number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

export interface DataState {
  data: ReadonlyArray<IData>;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  createData: (newData: IData) => Promise<void>;
  updateData: (id: number, updatedData: IData) => Promise<void>;
  deleteData: (id: number) => Promise<void>;
}
