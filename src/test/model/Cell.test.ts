import { Cell } from "../../main/model/Cell";

test("left click action triggers properly", () => {
  const cell = new Cell(false);
  cell.cellLeftClick();
  expect(cell.uncovered).toBe(true);
});

test("right click action triggers propery", () => {
  const cell = new Cell(false);
  const markerBeforeClick = cell.marker;
  cell.cellRightClick();
  const markerAfterClick = cell.marker;
  expect(markerBeforeClick === markerAfterClick).toBe(false);
});

test("right click action does not trigger when cell is uncovered", () => {
  const cell = new Cell(false);
  cell.cellLeftClick();
  const markerBeforeClick = cell.marker;
  cell.cellRightClick();
  const markerAfterClick = cell.marker;
  expect(markerBeforeClick === markerAfterClick).toBe(true);
});
