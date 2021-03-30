import React, { useEffect } from "react";
import "./App.scss";
import SettingsContainer from "./settings-container/SettingsContainer";
import {
  defaultBombQty,
  defaultCols,
  defaultRows,
} from "../controller/GameController";
import BoardContainer from "./board-container/BoardContainer";
import { connect } from "react-redux";
import { newBoard, loadBoard } from "./reducers/gameController";

export const savedGameController = "savedGameController";

interface IApp extends DispatchProps {}

const App = (props: IApp) => {
  useEffect(() => {
    if (localStorage.getItem(savedGameController)) {
      props.loadBoard(JSON.parse(localStorage.getItem(savedGameController)!));
      localStorage.removeItem(savedGameController);
    } else {
      props.newBoard(defaultRows, defaultCols, defaultBombQty);
    }
  }, []);

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-auto">
          <SettingsContainer />
        </div>
        <div
          className="col-auto"
          style={{ position: "absolute", top: "250px" }}
        >
          <BoardContainer />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  newBoard,
  loadBoard,
};

type DispatchProps = typeof mapDispatchToProps;

export default connect(null, mapDispatchToProps)(App);
