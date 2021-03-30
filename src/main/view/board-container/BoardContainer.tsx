import "./BoardContainer.scss";
import React from "react";
import BoardHeader from "./board-header/BoardHeader";
import BoardBody from "./board-body/BoardBody";
import { IRootState } from "../reducers";
import { connect } from "react-redux";
import { GameState } from "../../controller/GameController";

interface IBoard extends StateProps {}
const BoardContainer = (props: IBoard) => {
  return (
    <div>
      <div style={{ width: "max-content", overflow: "auto", padding: "5px" }}>
        <div id="board-header" className="board-header">
          <BoardHeader />
        </div>
        <div id="board-body" className="board-body">
          <BoardBody />
        </div>
      </div>
      {props.gameState === GameState.GAME_LOST && (
        <div>JAJAJAJA SOS MALISIMO!</div>
      )}
      {props.gameState === GameState.GAME_WON && (
        <div>
          <div>FELICITACIONES!</div>
          <div>{`Puntaje: ${props.score}`}</div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = ({ gameController }: IRootState) => ({
  gameState: gameController.gameState,
  score: gameController.score,
  gameController,
});
type StateProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps)(BoardContainer);
