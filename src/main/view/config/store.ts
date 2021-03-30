import { createStore } from "redux";
import reducer, { IRootState } from "../reducers";

const initialize = (initialState?: IRootState) =>
  createStore(reducer, initialState);

export default initialize;
