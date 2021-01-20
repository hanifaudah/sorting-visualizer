import React, { useState } from "react";
import styled from "styled-components";

// Images
import DownChevron from "../images/down-chevron.svg";

// Constants
import { SPEED } from "../utils/constants";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  setSpeed,
  setCurrentAlgorithm,
  setArraySize,
} from "../redux/modules/main";
import {
  stopSorting,
  rerenderGrid,
  getNewValues,
} from "../redux/modules/main/thunks";

// Algorithms
import { ALGORITHMS } from "../algorithms";

const CSS = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: min-content;

  & * {
    color: white;
  }

  .navbar {
    background: rgb(2, 0, 15);
    padding: 0.5em 1em;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    &.top {
      button {
        display: none;
      }
    }

    & * {
      margin: 0 0.5em;
    }

    #slider {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      h4 {
        margin: 0;
        margin-right: 0.5em;
        font-size: 0.9em;
        font-weight: normal;
      }
    }

    #brand {
      display: flex;
      align-items: center;
      width: 100%;

      h1 {
        margin: 0;
        font-size: 1em;
      }
    }
  }

  button,
  select {
    outline: none;
    border: none;
    cursor: pointer;
    height: min-content;
  }

  button {
    background: none;
  }

  select {
    background: rgb(0, 94, 194);
    border-radius: 0.5em;
    padding: 0.2em;
  }

  optgroup,
  option {
    color: black;
    borde-radius: 1em;
    background: white;
  }

  #mobile-control-bar {
    display: none;
    background: rgb(2, 0, 15);
    padding: 0 0.5em;
    cursor: pointer;
    height: 3em;

    h1 {
      color: white;
      font-size: 1em;
    }
  }

  .mobile-control-container {
    width: 100vw;
    position: fixed;
    bottom: 0;
  }

  @media (max-width: 768px) {
    .navbar {
      &.top {
        button {
          display: block;
        }
      }

      &.bottom {
        flex-direction: column;
        align-items: center;
        max-height: 0;
        overflow: hidden;
        padding: 0 0.5em;
        transition: max-height 0.2s;

        &.show {
          max-height: 1000px;
          transition: max-height 0.5s;
        }

        > * {
          margin: 0.4em 0;
        }

        > button,
        select {
          width: 100%;
          padding: 0.5em;
        }

        > :last-child {
          margin-bottom: 1em;
        }

        #slider {
          display: none;
          flex-direction: row;
          > :first-child {
            order: 1;
          }
        }

        button {
          background: rgb(196, 183, 0);
          border-radius: 0.5em;

          &.run-btn {
            display: none;
          }
        }
      }
    }

    #mobile-control-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        height: 1em;

        &.up {
          transform: rotate(180deg);
        }
      }
    }
  }
`;

const NavBar = () => {
  // Dispatch function
  const dispatch = useDispatch();

  // Global state
  const { arraySize } = useSelector((state) => state.main);

  // Local state
  const [curSize, setCurSize] = useState(arraySize);
  const [showControl, setShowControl] = useState(false);

  return (
    <CSS>
      <div className={`mobile-control-container ${showControl ? "show" : ""}`}>
        <div
          id="mobile-control-bar"
          onClick={() => setShowControl((prev) => !prev)}
        >
          <h1>Controls</h1>
          <img src={DownChevron} className={!showControl ? "up" : ""} />
        </div>
        <div className={`navbar bottom ${showControl ? "show" : ""}`}>
          <div id="slider">
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
            <h4>Array size: {curSize}</h4>
          </div>
          <button onClick={() => dispatch(getNewValues())}>
            Get new values
          </button>
          <button onClick={() => dispatch(stopSorting())}>Stop</button>
          <RunButton />
          <button onClick={() => dispatch(rerenderGrid())}>Reset</button>
          <select
            onChange={(e) => dispatch(setCurrentAlgorithm(e.target.value))}
          >
            <optgroup>
              {Object.values(ALGORITHMS).map((obj, idx) => (
                <option key={idx} value={obj.verbose}>
                  {obj.displayName}
                </option>
              ))}
            </optgroup>
          </select>
          <select
            onChange={(e) => dispatch(setSpeed(SPEED[e.target.value].speed))}
          >
            <optgroup>
              {Object.values(SPEED).map((obj, idx) => (
                <option key={idx} value={obj.verbose}>
                  {obj.displayName}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>
    </CSS>
  );
};

const RunButtonCSS = styled.button`
  &.run-btn {
    background: rgb(255, 227, 51);
    color: black;
    font-weight: bold;
    border-radius: 0.5em;
    padding: 0.2em 1em;
    font-size: 1em;
  }
`;

const RunButton = () => {
  const { currentAlgorithm } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  return (
    <RunButtonCSS
      onClick={() => {
        dispatch(rerenderGrid());
        ALGORITHMS[currentAlgorithm].func();
      }}
      className="run-btn"
    >
      Run
    </RunButtonCSS>
  );
};

const Top = () => {
  return (
    <CSS>
      <div className="navbar top">
        <div id="brand">
          <h1>Sorting Visualizer</h1>
        </div>
        <RunButton />
      </div>
    </CSS>
  );
};

NavBar.Top = Top;

export default NavBar;
