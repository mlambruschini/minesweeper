import "./SettingsContainer.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { newBoard } from "../reducers/gameController";
import {
  defaultBombQty,
  defaultCols,
  defaultRows,
  GameState,
} from "../../controller/GameController";
import { IRootState } from "../reducers";
import { savedGameController } from "../App";

interface ISettingsContainer extends StateProps, DispatchProps {}
const SettingsContainer = (props: ISettingsContainer) => {
  const [rows, setRows] = useState<number>(defaultRows);
  const [columns, setColumns] = useState<number>(defaultCols);
  const [bombQty, setBombQty] = useState(defaultBombQty);

  useEffect(() => {
    if (bombQty !== props.board.bombQty) {
      setBombQty(props.board.bombQty);
    }

    if (rows !== props.board.rows) {
      setRows(props.board.rows);
    }

    if (columns !== props.board.cols) {
      setColumns(props.board.cols);
    }
  }, [props.board, props.board.rows, props.board.cols]);

  const rowInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRows(parseInt(event.target.value));
  };

  const columnsInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumns(parseInt(event.target.value));
  };

  const bombInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBombQty(parseInt(event.target.value));
  };

  const newBoardHandler = () => {
    props.newBoard(rows, columns, bombQty);
  };

  const saveGameController = () => {
    localStorage.setItem(
      savedGameController,
      JSON.stringify(props.gameController)
    );
  };

  return (
    <div>
      <div className="row settings-row" style={{ textAlign: "center" }}>
        <label className="title">Ajustes</label>
      </div>
      <div className="row justify-content-between settings-row">
        <div className="col-auto">
          <label className="input-title">Filas: </label>
        </div>
        <div className="col-auto" style={{ textAlign: "right" }}>
          <input
            id="row-input"
            className="form-control input"
            type="number"
            min={1}
            value={rows}
            onChange={rowInputHandler}
          />
        </div>
      </div>
      <div className="row justify-content-between settings-row">
        <div className="col-auto">
          <label className="input-title">Columnas: </label>
        </div>
        <div className="col-auto" style={{ textAlign: "right" }}>
          <input
            id="column-input"
            className="form-control input"
            type="number"
            min={1}
            value={columns}
            onChange={columnsInputHandler}
          />
        </div>
      </div>
      <div className="row justify-content-between settings-row">
        <div className="col-auto">
          <label className="input-title">Bombas: </label>
        </div>
        <div className="col-auto">
          <input
            id="bomb-input"
            className="form-control input"
            type="number"
            min={1}
            value={bombQty}
            onChange={bombInputHandler}
          />
        </div>
      </div>
      <div className="row justify-content-between settings-row">
        <div className="col-auto">
          <button
            className="btn btn-secondary"
            onClick={saveGameController}
            disabled={props.gameState !== GameState.PLAYING}
          >
            <label className="button-label">Guardar</label>
          </button>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={() => newBoardHandler()}>
            <label className="button-label">Juego Nuevo</label>
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ gameController }: IRootState) => ({
  board: gameController.board,
  gameState: gameController.gameState,
  gameController,
});

const mapDispatchToProps = {
  newBoard,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
