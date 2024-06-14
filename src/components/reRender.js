import updateElement from "./update";
import { createElement } from './createElement';
import App from '../index';

let oldNode = null;

const reRender = () => {
  console.log("reRender");
  const root = document.getElementById("root");
  updateElement(root, createElement(App), oldNode);
  oldNode = App;
};

reRender.setOldNode = (component) => {
  oldNode = createElement(component);
};

export default reRender;
