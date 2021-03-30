import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { defaultBombQty, GameState } from "../../../controller/GameController";
import { IRootState } from "../../reducers";
import { resetBoard, incrementScore } from "../../reducers/gameController";

interface IBoardHeader extends StateProps, DispatchProps {}
const BoardHeader = (props: IBoardHeader) => {
  const [bombsRemaining, setBombsRemaining] = useState<number>(defaultBombQty);

  useEffect(() => {
    setBombsRemaining(props.bombQty - props.flagQty);
  }, [props.flagQty, props.bombQty]);

  useEffect(() => {
    let timerID = setTimeout(() => {
      if (props.gameState === GameState.PLAYING) {
        props.incrementScore();
      }
    }, 1000);
    if (props.gameState !== GameState.PLAYING) clearTimeout(timerID);
  }, [props.score, props.gameState]);

  return (
    <div className="row g-0 justify-content-between">
      <div className="col-2 number-container">{bombsRemaining}</div>
      <div className="col-auto">
        <button onClick={() => props.resetBoard()}>reset</button>
      </div>
      <div className="col-2 number-container">{props.score}</div>
    </div>
  );
};

const mapStateToProps = ({ gameController }: IRootState) => ({
  bombQty: gameController.board.bombQty,
  flagQty: gameController.board.flagQty,
  score: gameController.score,
  gameState: gameController.gameState,
  gameController,
});
const mapDispatchToProps = {
  resetBoard,
  incrementScore,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeader);
