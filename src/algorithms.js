// DS
import { Queue } from "buckets-js";

// Redux
import { store } from "./redux/store";
import { addTimeout } from "./redux/modules/main/thunks";

// Constants
import { STATE } from "./utils/constants";

// utils
import { getHeight, swap, setItemState, removeItemState } from "./utils/funcs";

let state = store.getState().main;
let { arraySize, speed: TIME_DELAY, timeouts } = state;
store.subscribe(() => {
  state = store.getState().main;
  ({ arraySize, speed: TIME_DELAY, timeouts } = state);
});

export const bubbleSort = () => {
  for (let i = 0; i < arraySize - 1; i++) {
    for (let j = 0; j < arraySize - i - 1; j++) {
      store.dispatch(
        addTimeout(() => {
          const curHeight = getHeight(j);
          const nextHeight = getHeight(j + 1);
          setItemState(j, STATE.ACTIVE.verbose);
          if (j > 0) removeItemState(j - 1, STATE.ACTIVE.verbose);
          if (curHeight > nextHeight) {
            swap(j, j + 1);
            if (j !== arraySize - i - 2)
              setItemState(j + 1, STATE.ACTIVE.verbose);
            removeItemState(j, STATE.ACTIVE.verbose);
          }
          if (j === arraySize - i - 2)
            setItemState(j + 1, STATE.SORTED.verbose);
          if (i === arraySize - 2) setItemState(0, STATE.SORTED.verbose);
        })
      );
    }
  }
};

export const selectionSort = () => {
  const pastMaxIdx = new Queue();
  for (let i = arraySize - 1; i >= 0; i--) {
    let curMaxIdx = 0;
    for (let j = 0; j <= i; j++) {
      store.dispatch(
        addTimeout(() => {
          if (!pastMaxIdx.isEmpty())
            removeItemState(pastMaxIdx.dequeue(), STATE.CURRENT.verbose);
          curMaxIdx = getHeight(curMaxIdx) < getHeight(j) ? j : curMaxIdx;
          if (j > 0) removeItemState(j - 1, STATE.ACTIVE.verbose);
          setItemState(j, STATE.ACTIVE.verbose);
          if (i < arraySize - 1) {
            removeItemState(i + 1, STATE.CURRENT.verbose);
            setItemState(i + 1, STATE.SORTED.verbose);
          }
          if (j == i) pastMaxIdx.enqueue(curMaxIdx);
          if (curMaxIdx !== i && j == i) {
            setItemState(curMaxIdx, STATE.CURRENT.verbose);
            setItemState(i, STATE.CURRENT.verbose);
            swap(curMaxIdx, i);
          }
          if (i === 0) setItemState(0, STATE.SORTED.verbose);
        })
      );
    }
  }
};

export const insertionSort = () => {
  let doSwap, cur;
  let toSort = { ...store.getState().main.arrayValues };
  const swapSeq = new Queue();
  for (let i = 1; i < arraySize; i++) {
    cur = i;
    doSwap = cur > 0 && toSort[cur - 1] > toSort[cur];
    while (doSwap) {
      swapSeq.enqueue([cur--, cur]);
      let temp = toSort[cur];
      toSort[cur] = toSort[cur + 1];
      toSort[cur + 1] = temp;
      doSwap = cur > 0 && toSort[cur - 1] > toSort[cur];
    }
  }

  // Draw insertion sort
  let qLen = swapSeq.size();
  let prev = null;
  let lastSwapPos = -1;
  for (let i = 0; i < qLen; i++) {
    store.dispatch(
      addTimeout(() => {
        let cur = swapSeq.dequeue();
        if (prev !== null && prev[1] !== cur[0]) {
          if (lastSwapPos !== -1)
            removeItemState(lastSwapPos, STATE.CURRENT.verbose);
          setItemState(prev[1], STATE.CURRENT.verbose);
          removeItemState(prev[1], STATE.ACTIVE.verbose);
          lastSwapPos = prev[1];
        }
        if (cur[1] < arraySize - 1)
          removeItemState(cur[1] + 1, STATE.ACTIVE.verbose);
        setItemState(cur[1], STATE.ACTIVE.verbose);
        swap(cur[0], cur[1]);
        prev = cur;
        if (swapSeq.isEmpty()) {
          removeItemState(cur[1], STATE.ACTIVE.verbose);
          removeItemState(lastSwapPos, STATE.CURRENT.verbose);
        }
      })
    );
  }
};

/**
 * TODO:
 * Quick Sort
 * Merge sort
 * shell sort
 * counting sort
 * bogo sort
 */

// All Algorithms
export const ALGORITHMS = {
  BUBBLE_SORT: {
    verbose: "BUBBLE_SORT",
    displayName: "Bubble sort",
    func: bubbleSort,
  },
  SELECTION_SORT: {
    verbose: "SELECTION_SORT",
    displayName: "Selection sort",
    func: selectionSort,
  },
  INSERTION_SORT: {
    verbose: "INSERTION_SORT",
    displayName: "Insertion sort",
    func: insertionSort,
  },
};
