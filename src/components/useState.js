import { myReact } from '../index.js'
let currentState = [];
let setters = [];
let stateCursor = 0;

function useState(initialValue) {
  const cursor = stateCursor; 
  
  if (currentState.length  === stateCursor) {
    currentState[cursor] = initialValue;
  }
  
  const setState = (newState) => {
    currentState[cursor] = newState;
    stateCursor = 0; 
    myReact.reRender();
  };
  setters[cursor] = setState; 
  stateCursor++; 
  return [currentState[cursor], setState];
}
export default useState;
