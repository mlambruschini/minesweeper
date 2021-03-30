import React from "react";
import { connect } from "react-redux";
import { CellArray } from "../../../model/Board";
import { Cell } from "../../../model/Cell";
import { IRootState } from "../../reducers";
import CellContainer from "./CellContainer";

interface IBoardBody extends StateProps {}
const BoardBody = (props: IBoardBody) => {
  return (
    <div>
      {props.cellMatrix.map((cellArray: CellArray, rowIndex: number) => (
        <div className="row gx-0" key={rowIndex}>
          {cellArray.map((cell: Cell, columnIndex: number) => (
            <CellContainer
              key={columnIndex}
              cell={cell}
              row={rowIndex}
              col={columnIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = ({ gameController }: IRootState) => ({
  cellMatrix: gameController.board.cellMatrix,
  gameController,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(BoardBody);
