import {createElement, createResource} from './components/createElement.js'
import { customRender, render } from './components/customRender.js'
import { updateFunctionComponent, updateHostComponent } from './components/function.js'
import performUnitOfWork from './components/performUnitOfWork.js'
import reconcileChildren from './components/reconcileChildren.js'
import useState from './components/useState.js'
import workLoop from './components/workLoop.js'
import updateElement from './components/update.js'
import { commitRoot, commitWork } from './components/commitRoot.js'


  /** @jsx myReact.createElement */
  const myReact = {
    createElement,
    createResource,
    customRender, 
    updateFunctionComponent, 
    updateHostComponent, 
    performUnitOfWork, 
    reconcileChildren, 
    useState,
    workLoop,
    updateElement,
    commitRoot,
    commitWork,
    render,
    useState,
  }
  
  /** @jsx Didact.createElement */
  function App() {
    const [state, setState] = myReact.useState(1)
    return (
      <h1 onClick={() => setState(c => c + 1)}>
        Count: {state}
      </h1>
    )
  }
  const container = document.getElementById("root")
  myReact.render(myReact.createElement(App), container)

export default App;
export { myReact };