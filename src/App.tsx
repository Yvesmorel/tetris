import "./App.css";
import Board from "./component/tetris_board";

function App() {
  return (
    <div className="app-container">
      <Board rows={30} cols={25}/>
    </div>
  );
}

export default App;
