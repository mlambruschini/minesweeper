import { combineReducers } from "redux";
import gameController, { GameControllerState } from "./gameController";

export interface IRootState {
  readonly gameController: GameControllerState;
}

const rootReducer = combineReducers<IRootState>({
  gameController,
});
export default rootReducer;
