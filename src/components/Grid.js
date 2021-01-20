import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Components
import NavBar from "./NavBar";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getNewValues } from "../redux/modules/main/thunks";

// Constants
import { MAX_VALUE, STATE } from "../utils/constants";
import { setArraySize } from "../redux/modules/main";

const CSS = styled.div`
  overflow: hidden;

  main {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    &,
    > div {
      box-sizing: border-box;
    }

    .array-container {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      height: 100%;
      background: rgb(242, 242, 242);
      margin-bottom: 3em;

      .array-item {
        background: ${STATE.DEFAULT.color};
        width: 0.5em;
        margin: 0 2px;

        ${(() => {
          let colorClasses = [];
          Object.values(STATE).map((state) =>
            colorClasses.push(`
              &.${state.verbose} {
                background: ${state.color};
              }
            `)
          );
          return colorClasses;
        })()}
      }

      ${(props) =>
        ((props) => {
          const classes = [];
          for (let i = 0; i < MAX_VALUE; i++) {
            classes.push(`
            .array-item-${props.arrayValues[i]} {
              height: ${5 * props.arrayValues[i]}px;
            }
          `);
          }
          return classes;
        })(props)}
    }
  }
`;

const Grid = () => {
  // Dispatch function
  const dispatch = useDispatch();

  // Global State
  const { arraySize, arrayValues } = useSelector((state) => state.main);

  useEffect(() => {
    dispatch(getNewValues());
  }, [arraySize]);

  useEffect(() => {
    if (window.innerWidth < 768) dispatch(setArraySize(20));
  }, []);

  return (
    <CSS arrayValues={arrayValues}>
      <main>
        <NavBar.Top />
        <div className="array-container">
          {arrayValues &&
            Object.values(arrayValues).map((val, idx) => (
              <div
                key={idx}
                className={`array-item array-item-${val} ${val}`}
              ></div>
            ))}
        </div>
        <NavBar />
      </main>
    </CSS>
  );
};

export default Grid;
