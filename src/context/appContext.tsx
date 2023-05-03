import React, { useContext, useReducer, ReactNode } from "react";
import axios from "axios";
import reducer from "./reducer";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const AppContext = React.createContext<any>(null);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useReducer(reducer, initialState);

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

  const fetchAllData = () => {};

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
