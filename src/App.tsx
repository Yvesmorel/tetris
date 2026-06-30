import "./App.css";
import Board from "./component/tetris_board";
function App() {


  return (
    <div className="w-screen h-full app" style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    }}>
      {/* <Forme matrix={currentForm} name="I" /> */}
       <Board rows={30} cols={25}/>
    </div>
  );
}

export default App;
