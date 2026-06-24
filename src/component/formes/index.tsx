import { GRID_CASE_WIDTH } from "../../data/forme";

function Forme({ name, matrix }: { name: string; matrix: number[][] }) {
  return (
    <div
      className={`tetromino-grid ${name}`}
      style={{ width: `${(matrix[0].length * (GRID_CASE_WIDTH))}px` ,gridTemplateColumns:`repeat(${matrix[0].length},1fr)`,gridTemplateRows:`repeat(${matrix.length}, 1fr)`}}
    >
      {matrix.map((row) => {
        return row.map((cell) =>
          cell === 1 ? (
            <div className="cell visible"></div>
          ) : cell === 0 ? (
            <div className="cell invisible text-black gate">i</div>
          ) : (
            <div className="cell invisible "></div>
          ),
        );
      })}
    </div>
  );
}

export default Forme;
