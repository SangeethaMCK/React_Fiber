import { myReact } from '../index.js'

const resourceCache = {};

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
     }, 
     children: [],
  };
}

function createElement(type, props, ...children) {
  if (typeof type === "function") {
    try {
      return type(props);
    } catch ({ promise, key }) {
      promise.then((value) => {
        resourceCache[key] = value;
        myReact.reRender();
      });

      return {
        type: "SuspensePlaceholder",
        props: {
          style: { color: "red", fontWeight: "bold" },
        },
          children: "Loading your content..."
      };
    }
  } else {
    return {
      type,
      props: {
        ...props,
      },
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    };
  }
}

const createResource = async (asyncTask, key) => {
  if (!resourceCache[key]) {
    try {
      const result = await asyncTask();
      console.log("Fetched resource:", key, result);  
      resourceCache[key] = result;
      
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching resource:", error);
    }
  }
  console.log("Returning cached resource:", key, resourceCache[key]);
  return resourceCache[key];
};


export { createElement, createResource };
