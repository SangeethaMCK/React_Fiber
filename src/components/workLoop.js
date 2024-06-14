import { myReact } from "../index.js";

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = myReact.performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && wipRoot) {
    myReact.commitRoot();
  }

  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);

export default workLoop;
