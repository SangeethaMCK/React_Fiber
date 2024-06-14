import { myReact } from '../index.js'

// wipRoot = Window.state.wipRoot;
let currentRoot = null; // Define the current root
let deletions = []; // Initialize deletions array

// Append all the DOM nodes to the parent DOM node
function commitRoot(wipRoot) {
  console.log("commitRoot", wipRoot);

  deletions.forEach(commitWork);

  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  if (fiber == null) return;

  let domParentFiber = fiber.parent;
  // Traverse up to find a parent with a DOM node
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;

  if (fiber.effectTag === "PLACEMENT" &&
     fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" &&
     fiber.dom != null) {
      myReact.updateElement(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    commitDeletion(fiber, domParent);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent)
  }
}

export { commitRoot, commitWork };
