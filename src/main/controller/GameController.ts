import { Board } from "../model/Board";
import { Marker } from "../model/Cell";

export enum GameState {
  EMPTY_BOARD = "Empty board",
  PLAYING = "Playing",
  GAME_WON = "Game Won",
  GAME_LOST = "Game Lost",
}

export const defaultRows = 10;
export const defaultCols = 10;
export const defaultBombQty = 20;

export class GameController {
  board: Board;
  gameState: GameState;
  score: number;

  constructor(
    rows = defaultRows,
    cols = defaultCols,
    bombQty = defaultBombQty
  ) {
    this.gameState = GameState.EMPTY_BOARD;
    this.board = new Board(rows, cols, bombQty);
    this.score = 0;
  }

  newBoard = (rows: number, cols: number, bombQty: number) => {
    this.gameState = GameState.EMPTY_BOARD;
    this.board = new Board(rows, cols, bombQty);
    this.score = 0;
    return this;
  };

  resetBoard = () => {
    this.newBoard(this.board.rows, this.board.cols, this.board.bombQty);
    return this;
  };

  loadController = (board: Board, gameState: GameState, score: number) => {
    this.board.loadBoard(board);
    this.gameState = gameState;
    this.score = score;
    return this;
  };

  incrementScore = () => {
    this.score++;
    return this;
  };

  private setGameLost = () => {
    this.gameState = GameState.GAME_LOST;
  };

  private setGameWon = () => {
    this.gameState = GameState.GAME_WON;
    this.board.flagCoveredCells();
  };

  private boardFirstClick = (row: number, col: number) => {
    this.board.fillBoard(row, col);
    this.gameState = GameState.PLAYING;
  };

  private uncoverLoadedCells = () => {
    this.board.cellMatrix.forEach((cellArray) =>
      cellArray.forEach((cell) => {
        if (cell.loaded && !cell.uncovered) cell.uncovered = true;
      })
    );
  };

  boardLeftClick = (row: number, col: number) => {
    // Board first click
    if (this.gameState === GameState.EMPTY_BOARD) {
      this.boardFirstClick(row, col);
    }

    this.board.cellMatrix[row][col].cellLeftClick();
    this.board.coveredQty--;

    // check if game is lost
    if (this.board.cellMatrix[row][col].loaded) {
      this.setGameLost();
      this.uncoverLoadedCells();
      return this;
    }

    // uncover adjacent cells
    this.board.uncoverAdjacentEmptyCells(row, col);

    // check if game is won
    if (this.board.coveredQty === this.board.bombQty) {
      this.setGameWon();
      console.log("game won");
      return this;
    }

    return this;
  };

  boardRightClick = (row: number, col: number) => {
    if (this.gameState === GameState.EMPTY_BOARD) {
      this.boardFirstClick(row, col);
    }

    this.board.cellMatrix[row][col].cellRightClick();
    if (this.board.cellMatrix[row][col].marker === Marker.FLAGGED) {
      this.board.flagQty++;
    } else if (this.board.cellMatrix[row][col].marker === Marker.NOT_SURE) {
      this.board.flagQty--;
    }

    return this;
  };
}
