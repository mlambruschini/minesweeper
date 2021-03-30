export enum Marker {
  EMPTY,
  FLAGGED,
  NOT_SURE,
}

export class Cell {
  loaded: boolean;
  uncovered: boolean;
  marker: Marker;
  adjacentMines: number;

  constructor(loaded: boolean) {
    this.loaded = loaded;
    this.uncovered = false;
    this.marker = Marker.EMPTY;
    this.adjacentMines = 0;
  }

  loadCell = (cell: Cell) => {
    this.loaded = cell.loaded;
    this.uncovered = cell.uncovered;
    this.marker = cell.marker;
    this.adjacentMines = cell.adjacentMines;
    return this;
  };

  cellLeftClick = () => {
    if (!this.uncovered) {
      this.uncovered = true;
      return true;
    }
  };

  cellRightClick = () => {
    if (this.uncovered) return;

    if (this.marker === Marker.EMPTY) {
      this.marker = Marker.FLAGGED;
    } else if (this.marker === Marker.FLAGGED) {
      this.marker = Marker.NOT_SURE;
    } else {
      this.marker = Marker.EMPTY;
    }
  };
}
