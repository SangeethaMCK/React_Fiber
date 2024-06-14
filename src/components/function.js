import { myReact } from '../index.js'

function updateFunctionComponent(fiber) {
    wipFiber = fiber
    hookIndex = 0
    wipFiber.hooks = []
    const children = [fiber.type(fiber.props)]
    myReact.reconcileChildren(fiber, children)
  }

  function updateHostComponent(fiber) {
    if (!fiber.dom) {
      fiber.dom = myReact.customRender(fiber)
    }
    myReact.reconcileChildren(fiber, fiber.props.children)
  }
  
  export {updateFunctionComponent, updateHostComponent} 