// State change functions
import { setTimeouts } from "./index";

// Constants
import { STATE } from "../../../utils/constants";

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
