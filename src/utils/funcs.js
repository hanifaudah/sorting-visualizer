// Constants
import { STATE } from "./constants";

export const getHeight = (idx) => {
  return Number.parseInt(
    document.querySelectorAll(".array-item")[idx].classList[2]
  );
};

export const swap = (idx1, idx2) => {
  const DOMArr = document.querySelectorAll(".array-item");
  const val1 = DOMArr[idx1].classList[2];
  const val2 = DOMArr[idx2].classList[2];
  DOMArr[idx1].classList.replace(val1, val2);
  DOMArr[idx1].classList.replace(`array-item-${val1}`, `array-item-${val2}`);
  DOMArr[idx2].classList.replace(val2, val1);
  DOMArr[idx2].classList.replace(`array-item-${val2}`, `array-item-${val1}`);
};

export const setItemState = (idx, state) => {
  const DOMArr = document.querySelectorAll(".array-item");
  DOMArr[idx].classList.add(state);
};

export const removeItemState = (idx, state) => {
  const DOMArr = document.querySelectorAll(".array-item");
  DOMArr[idx].classList.remove(state);
};
