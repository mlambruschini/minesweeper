import {
  defaultBombQty,
  defaultCols,
  defaultRows,
  GameController,
  GameState,
} from "../../main/controller/GameController";

test("new game controller is created propery", () => {
  const gameController = new GameController();
  expect(gameController.board.bombQty).toBe(defaultBombQty);
  expect(gameController.board.rows).toBe(defaultRows);
  expect(gameController.board.cols).toBe(defaultCols);
  expect(gameController.gameState).toBe(GameState.EMPTY_BOARD);
});

test("game controller to start game properly", () => {
  const gameController = new GameController();
  gameController.boardLeftClick(0, 0);
  expect(gameController.gameState).toBe(GameState.PLAYING);
});

test("game controller board to reset properly", () => {
  const gameController = new GameController();
  const coveredQtyBeforeClick = gameController.board.coveredQty;
  gameController.boardLeftClick(0, 0);
  gameController.resetBoard();
  expect(gameController.board.coveredQty).toBe(coveredQtyBeforeClick);
});

test("game controller to increment score properly", () => {
  const gameController = new GameController();
  const scoreBeforeIncrement = gameController.score;
  gameController.incrementScore();
  const scoreAfterIncrement = gameController.score;
  expect(scoreAfterIncrement).toBe(scoreBeforeIncrement + 1);
});
