import { myReact } from '../index.js'

// components/customRender.js
function customRender(element) {  // change all customrender arguments to element
  console.log("customRender")
  if (typeof element.type === "function") {
    element = element.type(element.props);
  }

  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode(element.props.nodeValue)
      : document.createElement(element.type);

  if (element.props) {
    for (const prop in element.props) {
      // if (prop !== "children") {
        if (prop === "nodeValue") {
          dom.nodeValue = element.props[prop];
        }
        else if(prop === "className") {
          dom.setAttribute("class", element.props[prop]);
        } else if (prop === "style") {
          Object.assign(dom.style, element.props[prop]);
        } else if (prop.startsWith("on") && typeof element.props[prop] === "function") {
          const eventType = prop.toLowerCase().substring(2);
          dom.addEventListener(eventType, element.props[prop]);
        } else {
          dom[prop] = element.props[prop];
        }
      // }
    }
    const { children } = element;
    if (Array.isArray(children)) {
      children.forEach((child) => {
        myReact.customRender(child, dom);
      });
    } else if (typeof children === "object" && children !== null) {
      myReact.customRender(children, dom);
    }
  }

  // container.appendChild(dom);
  return dom;
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {},
    children: [element],
    alternate: currentRoot,
  }
  deletions = []
  nextUnitOfWork = wipRoot
}

let nextUnitOfWork = null;
let currentRoot = null;
let wipRoot=null
let deletions = []
export  {customRender, render};
