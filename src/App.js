import React, { useState } from "react";

const data = [
  { row: ["1", "2", "3"] },
  { row: ["1", "2", "3", "4"] },
  { row: ["1", "2"] },
];
let initialState = {};

data.map((row, rowIndex) => {
  row.row.map((column, columnIndex) => {
    initialState[`${rowIndex}-${columnIndex}`] = false;
  });
});

function App() {
  const [state, setState] = useState(initialState);

  const handleClose = (e) => {
    let { id } = e.currentTarget;
    setState((prevState) => {
      return {
        ...prevState,
        [id]: true,
      };
    });
  };

  const handleReset = (e) => {
    const { id } = e.currentTarget;
    let counter = -1;
    let resetState = { ...state };
    for (const property in resetState) {
      if (property.startsWith(id.toString() + "-")) {
        counter = counter + 1;
        resetState[id + "-" + counter] = false;
      }
    }
    setState(resetState);
  };
  return (
    <div className="container">
      {data.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          <div className="d-flex">
            <div>
              <button id={rowIndex} onClick={(e) => handleReset(e)}>
                reset
              </button>
            </div>
            {row.row.map((number, columnIndex) => (
              <div
                className={
                  state[rowIndex.toString() + "-" + columnIndex.toString()]
                    ? "col d-flex justify-content-between border bg-success text-white d-none"
                    : "col d-flex justify-content-between border bg-success text-white"
                }
                key={columnIndex}
              >
                {number}
                <button
                  id={`${rowIndex}-${columnIndex}`}
                  onClick={(e) => handleClose(e)}
                >
                  close
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
