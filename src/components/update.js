import { myReact } from '../index.js'

function updateElement(parentDom, newNode, oldNode, index = 0) {
  // console.log("updateElement", parentDom, newNode, oldNode, index);
    if (!oldNode) {
      parentDom.appendChild(
        myReact.customRender(newNode,parentDom)
      );
    } else if (!newNode) {
      parentDom.removeChild(
        parentDom.childNodes[index]
      );
    } else if (changed(newNode, oldNode)) {
      parentDom.replaceChild(
        myReact.customRender(newNode,parentDom),
        parentDom.childNodes[index]
      );
    } else if (newNode.type) {
      updateProps(
        parentDom,
        newNode.props,
        oldNode.props
      );
      const newLength = newNode.children.length;
      const oldLength = oldNode.children.length;
      for (let i = 0; i < newLength || i < oldLength; i++) {
        myReact.updateElement(
          parentDom
,          newNode.children[i],
          oldNode.children[i],
          i
        );
      }
    }
    return parentDom.childNodes[index];
  }
  
function setBooleanProp(parentDom, name, value) {
    if (value) {
      parentDom.setAttribute(name, value);
      parentDom[name] = true;
    } else {
      parentDom[name] = false;
    }
  }
  
  function removeBooleanProp(parentDom, name) {
    parentDom.removeAttribute(name);
    parentDom[name] = false;
  }
  
  function isCustomProp(name) {
    return false;
  }
  
  function setProp(parentDom, name, value) {
    if (isCustomProp(name)) {
      return;
    } else if (name === 'className') {
      parentDom.setAttribute('class', value);
    } else if (typeof value === 'boolean') {
      setBooleanProp(parentDom, name, value);
    } else {
      parentDom.setAttribute(name, value);
    }
  }
  
  function removeProp(parentDom, name, value) {
    if (isCustomProp(name)) {
      return;
    } else if (name === 'className') {
      parentDom.removeAttribute('class');
    } else if (typeof value === 'boolean') {
      removeBooleanProp(parentDom, name);
    } else {
      parentDom.removeAttribute(name);
    }
  }
  function updateProp(parentDom, name, newVal, oldVal) {
    if (!newVal) {
      removeProp(parentDom, name, oldVal);
    } else if (!oldVal || newVal !== oldVal) {
      setProp(parentDom, name, newVal);
    }
  }
  
  function updateProps(parentDom, newProps, oldProps = {}) {
    const props = Object.assign({}, newProps, oldProps);
    Object.keys(props).forEach(name => {
      updateProp(parentDom, name, newProps[name], oldProps[name]);
    });
  }
  

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
           (typeof node1 === 'TEXT_ELEMENT' && node1.props.nodeValue !== node2.props.nodeValue) ||
           node1.type !== node2.type;
}

export default updateElement;
