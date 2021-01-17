export class Component{
  constructor(){}
  setAttribute(name,value){
    this.root.setAttribute(name,value)
  }
  appendChild(child){
    this.root.appendChild(child.root)
  }
  mountTo(parent){
    parent.appendChild(this.root)
  }
}

class ElementWarpper extends Component{
  constructor(type){
    super();
    this.root = document.createElement(type)
  }
}

class TextNodeWarpper extends Component{
  constructor(text){
    super();
    this.root = document.createTextNode(text);
  }
}

export function createElement(type, attributes, ...children){
  let dom;
  if(typeof type === 'string'){
    dom = new ElementWarpper(type)
  } else {
    dom = new type();
  }
  for (const name in attributes) {
    dom.setAttribute(name, attributes[name])
  }
  for (const child of children) {
    if(typeof child === 'string')
      child = new TextNodeWarpper(child)
    dom.appendChild(child)
  }
  return dom
}