import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  UPDATE_DATA_REQUEST,
  UPDATE_DATA_SUCCESS,
  UPDATE_DATA_ERROR,
  DELETE_DATA_REQUEST,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_ERROR,
} from "../src/context/actions";

export interface IFetchDataRequest {
  type: typeof FETCH_DATA_REQUEST;
  payload?: any;
}
export interface IFetchDataSuccess {
  type: typeof FETCH_DATA_SUCCESS;
  payload?: any;
}
export interface IFetchDataError {
  type: typeof FETCH_DATA_ERROR;
  payload?: any;
}

export interface IUpdateDataRequest {
  type: typeof UPDATE_DATA_REQUEST;
  payload?: any;
}
export interface IUpdateDataSuccess {
  type: typeof UPDATE_DATA_SUCCESS;
  payload?: any;
}
export interface IUpdateDataError {
  type: typeof UPDATE_DATA_ERROR;
  payload?: any;
}

export interface IDeleteDataRequest {
  type: typeof DELETE_DATA_REQUEST;
  payload?: any;
}
export interface IDeleteDataSuccess {
  type: typeof DELETE_DATA_SUCCESS;
  payload?: any;
}
export interface IDeleteDataError {
  type: typeof DELETE_DATA_ERROR;
  payload?: any;
}

export type Actions =
  | IFetchDataRequest
  | IFetchDataSuccess
  | IFetchDataError
  | IUpdateDataRequest
  | IUpdateDataSuccess
  | IUpdateDataError
  | IDeleteDataRequest
  | IDeleteDataSuccess
  | IDeleteDataError;
