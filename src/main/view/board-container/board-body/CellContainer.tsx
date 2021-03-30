import React from "react";
import { Cell, Marker } from "../../../model/Cell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faQuestion, faFlag } from "@fortawesome/free-solid-svg-icons";
import { IRootState } from "../../reducers";
import { connect } from "react-redux";
import { leftClick, rightClick } from "../../reducers/gameController";
import { GameState } from "../../../controller/GameController";

const uncoveredCellColor = [
  "darkGrey",
  "#2B00FF",
  "#156A03",
  "#F10008",
  "#110067",
  "#660001",
  "#1C6967",
  "#000000",
  "grey",
];

const getButtonIcon = (marker: Marker) => {
  if (marker === Marker.FLAGGED) {
    return <FontAwesomeIcon icon={faFlag} style={{ color: "red" }} />;
  } else if (marker === Marker.NOT_SURE) {
    return <FontAwesomeIcon icon={faQuestion} style={{ color: "black" }} />;
  }
};

interface ICellContainer extends StateProps, DispatchProps {
  cell: Cell;
  row: number;
  col: number;
}

const CellContainer = (props: ICellContainer) => {
  const clickHandler = (event: any) => {
    if (
      (props.gameState === GameState.EMPTY_BOARD ||
        props.gameState === GameState.PLAYING) &&
      props.cell.marker === Marker.EMPTY
    ) {
      props.leftClick(props.row, props.col);
    }
  };

  const contextMenuHandler = (event: any) => {
    if (
      props.gameState === GameState.EMPTY_BOARD ||
      props.gameState === GameState.PLAYING
    ) {
      event.preventDefault();
      event.stopPropagation();
      props.rightClick(props.row, props.col);
    }
  };

  return (
    <div
      style={{
        height: "20px",
        width: "20px",
        margin: "2px",
      }}
    >
      {props.cell.uncovered ? (
        <div
          className="cell-uncovered"
          style={{ color: uncoveredCellColor[props.cell.adjacentMines] }}
        >
          {!props.cell.loaded ? (
            props.cell.adjacentMines
          ) : (
            <FontAwesomeIcon icon={faBomb} style={{ color: "black" }} />
          )}
        </div>
      ) : (
        <button
          id="cell-button"
          className="cell-covered"
          onClick={clickHandler}
          onContextMenu={contextMenuHandler}
        >
          {getButtonIcon(props.cell.marker)}
        </button>
      )}
    </div>
  );
};

const mapToStateProps = ({ gameController }: IRootState) => ({
  gameState: gameController.gameState,
  gameController,
});

const mapDispatchToProps = {
  leftClick,
  rightClick,
};

type StateProps = ReturnType<typeof mapToStateProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapToStateProps, mapDispatchToProps)(CellContainer);
