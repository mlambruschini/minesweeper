import { GameController } from "../../controller/GameController";

export const actionTypes = {
  NEW_BOARD: "NEW_BOARD",
  LEFT_CLICK: "LEFT_CLICK",
  RIGHT_CLICK: "RIGHT_CLICK",
  INCREMENT_SCORE: "INCREMENT_SCORE",
  RESET: "RESET",
  LOAD: "LOAD,",
};

const initialState: GameController = new GameController();

export type GameControllerState = Readonly<typeof initialState>;

// Reducer

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state: GameControllerState = initialState,
  action: any
): GameControllerState => {
  switch (action.type) {
    case actionTypes.NEW_BOARD:
      return {
        ...state.newBoard(
          action.payload.rows,
          action.payload.cols,
          action.payload.bombQty
        ),
      };
    case actionTypes.LEFT_CLICK:
      return {
        ...state.boardLeftClick(action.payload.row, action.payload.col),
      };
    case actionTypes.RIGHT_CLICK:
      return {
        ...state.boardRightClick(action.payload.row, action.payload.col),
      };
    case actionTypes.INCREMENT_SCORE:
      return { ...state.incrementScore() };
    case actionTypes.RESET:
      return {
        ...state.resetBoard(),
      };
    case actionTypes.LOAD:
      return {
        ...state.loadController(
          action.payload.board,
          action.payload.gameState,
          action.payload.score
        ),
      };
    default:
      return state;
  }
};

// Actions

export const newBoard = (rows: number, cols: number, bombQty: number) => ({
  type: actionTypes.NEW_BOARD,
  payload: { rows, cols, bombQty },
});

export const leftClick = (row: number, col: number) => ({
  type: actionTypes.LEFT_CLICK,
  payload: { row, col },
});

export const rightClick = (row: number, col: number) => ({
  type: actionTypes.RIGHT_CLICK,
  payload: { row, col },
});

export const incrementScore = () => ({
  type: actionTypes.INCREMENT_SCORE,
});

export const resetBoard = () => ({
  type: actionTypes.RESET,
});

export const loadBoard = (gameController: GameController) => ({
  type: actionTypes.LOAD,
  payload: gameController,
});
