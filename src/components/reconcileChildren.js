import { myReact } from '../index.js'
let deletions = []; // Initialize deletions array

function reconcileChildren(wipFiber, elements) {
  console.log("recocncile")
  let index = 0;
  let oldFiber = wipFiber.alternate || wipFiber.children;
  
  console.log("oldFiber", oldFiber, "elements", elements);  
  
  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;

    const sameType = oldFiber && element && element.type == oldFiber.type;

    // Update the node
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }
    
    // Add this node
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }

    // Delete the oldFiber's node
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    console.log("newFiber", newFiber);  

    // Link the new fiber to the previous sibling or set it as the first child
    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (prevSibling) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
// return prevSibling
}

export default reconcileChildren;
