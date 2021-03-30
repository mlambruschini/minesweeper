import { Cell, Marker } from "./Cell";

export type CellArray = Cell[];
export class Board {
  cellMatrix: CellArray[];
  bombQty: number;
  flagQty: number;
  coveredQty: number;
  rows: number;
  cols: number;
  private totalCells: number;
  readonly maxRows: number = 100;
  readonly maxCols: number = 100;

  constructor(rows: number, cols: number, bombQty: number) {
    this.rows = rows;
    this.cols = cols;
    this.totalCells = rows * cols;
    this.cellMatrix = this.generateCellMatrix(rows, cols);
    this.bombQty =
      bombQty < this.totalCells / 2 ? bombQty : Math.floor(this.totalCells / 2);
    this.flagQty = 0;
    this.coveredQty = this.totalCells;
  }

  loadBoard(board: Board) {
    this.bombQty = board.bombQty;
    this.flagQty = board.flagQty;
    this.coveredQty = board.coveredQty;
    this.rows = board.rows;
    this.cols = board.cols;
    this.totalCells = board.rows * board.cols;
    this.copyCellMatrix(board.cellMatrix);
  }

  fillBoard = (clickedRow: number, clickedCol: number) => {
    // first clicked position on the board
    const forbiddenPosition = clickedRow * this.cols + clickedCol;

    const loadedPositions: number[] = this.generateLoadedPositionsArray(
      forbiddenPosition
    );

    loadedPositions.forEach((position) => {
      const row = this.getRowFromPosition(position);
      const col = this.getColFromPosition(position);
      this.cellMatrix[row][col].loaded = true;

      this.setAdjacentMineCount(row, col);
    });
  };

  uncoverAdjacentEmptyCells = (row: number, col: number) => {
    if (this.cellMatrix[row][col].adjacentMines === 0) {
      for (let relativeRow = -1; relativeRow <= 1; relativeRow++) {
        for (let relativeCol = -1; relativeCol <= 1; relativeCol++) {
          // prevent entering to father cell
          if (relativeRow !== 0 || relativeCol !== 0) {
            try {
              if (
                !this.cellMatrix[row + relativeRow][col + relativeCol]
                  .uncovered &&
                this.cellMatrix[row + relativeRow][col + relativeCol].marker ===
                  Marker.EMPTY
              ) {
                this.cellMatrix[row + relativeRow][
                  col + relativeCol
                ].uncovered = true;
                this.coveredQty--;
                this.uncoverAdjacentEmptyCells(
                  row + relativeRow,
                  col + relativeCol
                );
              }
            } catch (error) {}
          }
        }
      }
    }
  };

  flagCoveredCells = () => {
    this.cellMatrix.forEach((cellArray) =>
      cellArray.forEach((cell) => {
        if (cell.loaded) cell.marker = Marker.FLAGGED;
      })
    );
  };

  private setAdjacentMineCount = (row: number, col: number) => {
    for (let relativeRow = -1; relativeRow <= 1; relativeRow++) {
      for (let relativeCol = -1; relativeCol <= 1; relativeCol++) {
        // prevent entering to father cell
        if (relativeRow !== 0 || relativeCol !== 0) {
          try {
            this.cellMatrix[row + relativeRow][col + relativeCol]
              .adjacentMines++;
          } catch (error) {}
        }
      }
    }
  };

  private getRowFromPosition = (position: number) => {
    return Math.floor(position / this.cols);
  };

  private getColFromPosition = (position: number) => {
    return position - this.getRowFromPosition(position) * this.cols;
  };

  private generateCellMatrix = (rows: number, cols: number) => {
    const boardValues: CellArray[] = [];
    for (let row = 0; row < rows; row++) {
      const rowPositionsArray: CellArray = [];
      for (let col = 0; col < cols; col++) {
        rowPositionsArray.push(new Cell(false));
      }
      boardValues.push(rowPositionsArray);
    }
    return boardValues;
  };

  private copyCellMatrix = (loadedCellMatrix: CellArray[]) => {
    this.cellMatrix = this.generateCellMatrix(this.rows, this.cols);
    this.cellMatrix.forEach((cellArray, rowIndex) =>
      cellArray.forEach(
        (cell, columnIndex) =>
          (cell = cell.loadCell(loadedCellMatrix[rowIndex][columnIndex]))
      )
    );
  };

  private generateLoadedPositionsArray = (forbiddenPosition: number) => {
    const loadedPositions: number[] = [];
    while (loadedPositions.length < this.bombQty) {
      const generatedPosition = Math.floor(Math.random() * this.totalCells);
      if (
        !loadedPositions.includes(generatedPosition) &&
        generatedPosition !== forbiddenPosition
      ) {
        loadedPositions.push(generatedPosition);
      }
    }
    return loadedPositions;
  };
}
