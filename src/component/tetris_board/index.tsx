import { useEffect, useRef, useState } from "react";
import { getInitialBoard, getRandomIntInclusive } from "../../lib/utils";
import { GRID_CASE_WIDTH, letters, tetrisMatrices } from "../../data/forme";
import Forme from "../formes";

function Board({ rows, cols }: { rows: number; cols: number }) {
  const tetrisMatrix = useRef(getInitialBoard(rows, cols));
  const tetrisPoint = useRef<Record<string, any>>({ break: [], sum: 0 });

  const [selectForm, setSelectForm] = useState(
    getRandomIntInclusive(0, letters.length - 1),
  );
  const [currentForm, setCurrentForm] = useState(tetrisMatrices[selectForm]);
  const [, forceTetrisRender] = useState(0);

  useEffect(() => {
    setCurrentForm(tetrisMatrices[selectForm]);
  }, [selectForm]);

  const score = tetrisPoint.current["sum"] ?? 0;

  return (
    <div className="game-container">
      <div className="board-wrapper">
        <div
          className="tetris-board"
          style={{
            width: `${tetrisMatrix.current[0].length * GRID_CASE_WIDTH}px`,
            gridTemplateColumns: `repeat(${tetrisMatrix.current[0].length},1fr)`,
            gridTemplateRows: `repeat(${tetrisMatrix.current.length}, 1fr)`,
          }}
        >
          <Forme
            tetrisPoint={tetrisPoint}
            matrix={currentForm}
            setMatrix={setCurrentForm}
            name={`${letters[selectForm]}`}
            tetrisMatrix={tetrisMatrix}
            forceTetrisRender={forceTetrisRender}
            setSelectForm={setSelectForm}
          />

          {tetrisMatrix.current.map((row, i) => {
            return row.map((cell, j) =>
              cell === 1 ? (
                <div
                  style={{
                    background: "#202020",
                  }}
                  id={`${i}-${j}`}
                  key={j}
                  className="cell visible 1"
                ></div>
              ) : (
                <div id={`${i}-${j}`} key={j} className="cell visible"></div>
              ),
            );
          })}
        </div>
      </div>

      <div className="sidebar-panel">
        <div className="sidebar-header">
          <h1 className="game-title">TETRIS</h1>
        </div>

        <div className="panel-card score-card">
          <div className="card-label">SCORE</div>
          <div className="card-value">{score}</div>
        </div>

        <div className="panel-card controls-card">
          <div className="card-label">CONTROLES</div>
          <div className="controls-list">
            <div className="control-row">
              <span className="control-key">←</span>
              <span className="control-key">→</span>
              <span className="control-desc">Déplacer</span>
            </div>
            <div className="control-row">
              <span className="control-key key-ctrl">Ctrl</span>
              <span className="control-desc">Pivoter</span>
            </div>
            <div className="control-row">
              <span className="control-key">↓</span>
              <span className="control-desc">Hâter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
