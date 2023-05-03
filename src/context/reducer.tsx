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
} from "./actions";
import { State, Actions } from "../../types";

const reducer = (state: State, action: Actions): State => {
  if (action.type === FETCH_DATA_REQUEST) {
    return { ...state, loading: true };
  }
  if (action.type === FETCH_DATA_SUCCESS) {
    return { ...state, loading: false, data: action.payload };
  }
  if (action.type === FETCH_DATA_ERROR) {
    return { ...state, loading: false, error: action.payload };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
