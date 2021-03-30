import { Board } from "../../main/model/Board";

test("creates board with proper width", () => {
  const board = new Board(10, 10, 10);
  expect(board.cellMatrix.length).toBe(10);
});

test("creates board with proper heigth", () => {
  const board = new Board(10, 10, 10);
  expect(board.cellMatrix[0].length).toBe(10);
});

test("creates board with proper bombQty", () => {
  const board = new Board(10, 10, 10);
  board.fillBoard(0, 0);
  let bombCount = 0;
  board.cellMatrix.forEach((cellArray) =>
    cellArray.forEach((cell) => {
      if (cell.loaded) bombCount++;
    })
  );
  expect(board.bombQty).toBe(bombCount);
});
