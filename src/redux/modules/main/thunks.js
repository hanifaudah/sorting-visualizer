// State change functions
import { setTimeouts, setArrayValues } from "./index";

// Constants
import { STATE, MAX_VALUE } from "../../../utils/constants";

export const stopSorting = () => {
  return (dispatch, _getState) => {
    const curTimeouts = _getState().main.timeouts;
    Object.values(curTimeouts).map((timeout) => clearTimeout(timeout));
    dispatch(setTimeouts({}));
  };
};

export const addTimeout = (timeout) => {
  return (dispatch, _getState) => {
    const curTimeout = _getState().main.timeouts;
    const newKey = Object.keys(curTimeout).length;
    dispatch(
      setTimeouts({
        ...curTimeout,
        [newKey]: setTimeout(timeout, (newKey + 1) * _getState().main.speed),
      })
    );
  };
};

export const rerenderGrid = () => {
  return (dispatch, _getState) => {
    dispatch(stopSorting());
    let DOMArr = document.querySelectorAll(".array-item");
    Object.values(_getState().main.arrayValues).map((val, idx) => {
      DOMArr[idx].classList.replace(DOMArr[idx].classList[2], `${val}`);
      DOMArr[idx].classList.replace(
        DOMArr[idx].classList[1],
        `array-item-${val}`
      );
      DOMArr[idx].classList.remove(STATE.ACTIVE.verbose);
      DOMArr[idx].classList.remove(STATE.SORTED.verbose);
      DOMArr[idx].classList.remove(STATE.CURRENT.verbose);
    });
  };
};

export const getNewValues = () => {
  return (dispatch, _getState) => {
    const initialArray = [];
    for (let i = 0; i < _getState().main.arraySize; i++)
      initialArray[i] = Math.round(Math.random() * MAX_VALUE) + 1;
    dispatch(setArrayValues(initialArray));
  };
};
