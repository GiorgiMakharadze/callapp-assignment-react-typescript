import { create } from "zustand";
import axios from "axios";
import { IData, DataState } from "../types/zustandTypes";

const dataFetch = axios.create({
  baseURL: `/api/v1`,
});
let url = `/data`;

dataFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log(error);
      return;
    }
    return Promise.reject(error);
  }
);

const useDataStore = create<DataState>((set) => ({
  data: [],
  loading: false,
  error: null,

  fetchData: async () => {
    try {
      set({ loading: true });
      const response = await dataFetch.get(url);

      set({ data: response.data.dataObject, error: null });
    } catch (error: Error | any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  createData: async (newData: IData) => {
    try {
      set({ loading: true });
      const response = await dataFetch.post(url, newData);
      set((state: DataState) => ({
        data: [...(state.data || []), response.data],
        error: null,
      }));
    } catch (error: Error | any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateData: async (id: number, updatedData: IData) => {
    try {
      set({ loading: true });
      const response = await dataFetch.patch(`${url}/${id}`, updatedData);
      set((state: DataState) => ({
        data: state.data?.map((item) =>
          item.id === id ? response.data : item
        ),
        error: null,
      }));
    } catch (error: Error | any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteData: async (id: number) => {
    try {
      set({ loading: true });
      await dataFetch.delete(`${url}/${id}`);
      set((state: DataState) => ({
        data: state.data?.filter((item) => item.id !== id),
        error: null,
      }));
    } catch (error: Error | any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useDataStore;
