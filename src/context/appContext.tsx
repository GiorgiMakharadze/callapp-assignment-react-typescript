import React, { useContext, useReducer, ReactNode } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
  FETCH_DATA_ERROR,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from "./actions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const AppContext = React.createContext<any>(null);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dataFetch = axios.create({
    baseURL: "/api/v1",
  });

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

  const fetchAllData = async () => {
    let url = `/data`;
    dispatch({ type: FETCH_DATA_REQUEST });
    try {
      const { data } = await dataFetch.get(url);

      const { name, email, gender, address, street, city, phone } = data;
      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: data.dataObject,
      });
    } catch (error: Error | any) {
      dispatch({
        type: FETCH_DATA_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  return (
    <AppContext.Provider value={{ ...state, fetchAllData }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
