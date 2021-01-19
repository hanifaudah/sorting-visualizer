import React, { useState } from "react";
import styled from "styled-components";

// Constants
import { SPEED } from "../utils/constants";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  setSpeed,
  setCurrentAlgorithm,
  setArraySize,
} from "../redux/modules/main";
import { stopSorting, rerenderGrid } from "../redux/modules/main/thunks";

// Algorithms
import { ALGORITHMS } from "../algorithms";

const CSS = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: min-content;

  .navbar {
    background: grey;
    padding: 0.5em 1em;
    width: 100%;
    display: flex;
    justify-content: center;

    #slider {
      display: flex;
      align-items: center;

      h4 {
        margin: 0;
        margin-right: 1em;
      }
    }
  }
`;

const NavBar = () => {
  // Dispatch function
  const dispatch = useDispatch();

  // Global state
  const { currentAlgorithm } = useSelector((state) => state.main);

  // Local state
  const [curSize, setCurSize] = useState(40);

  return (
    <CSS>
      <div className="navbar">
        <div id="slider">
          <h4>{curSize}</h4>
          <input
            type="range"
            min="30"
            max="60"
            defaultValue={curSize}
            onMouseUp={(e) => {
              dispatch(setArraySize(e.target.value));
            }}
            onChange={(e) => setCurSize(e.target.value)}
          />
        </div>
        <button onClick={() => dispatch(stopSorting())}>Stop</button>
        <button onClick={() => dispatch(rerenderGrid())}>Reset</button>
        <button onClick={ALGORITHMS[currentAlgorithm].func}>Run</button>
        <select onChange={(e) => dispatch(setCurrentAlgorithm(e.target.value))}>
          {Object.values(ALGORITHMS).map((obj, idx) => (
            <option key={idx} value={obj.verbose}>
              {obj.displayName}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => dispatch(setSpeed(SPEED[e.target.value].speed))}
        >
          {Object.values(SPEED).map((obj, idx) => (
            <option key={idx} value={obj.verbose}>
              {obj.displayName}
            </option>
          ))}
        </select>
      </div>
    </CSS>
  );
};

export default NavBar;
