export const ATTRIBUTE = Symbol('attribute')
export const STATE = Symbol('state')

export class Component{
  constructor(){
    this[ATTRIBUTE] = Object.create(null)
    this[STATE] = Object.create(null)
  }
  render(){
    return this.root
  }
  setAttribute(name,value){
    this[ATTRIBUTE][name] = value
  }
  appendChild(child){
    this.root.appendChild(child.root)
  }
  mountTo(parent){
    if(!this.root)
      this.render()
    parent.appendChild(this.root)
  }
  triggerEvent(type, args){
    this[ATTRIBUTE][`on${type.replace(/^[\s\S]/, s => s.toUpperCase())}`](new CustomEvent(type, {
      detail: args
    }))
  }
}

class ElementWarpper extends Component{
  constructor(type){
    super();
    this.root = document.createElement(type)
  }
  setAttribute(name,value){
    this.root.setAttribute(name, value)
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
  let processChildren = (children) => {
    for (const child of children) {
      if(Array.isArray(child)){
        processChildren(child)
        continue
      }
      if(typeof child === 'string')
        child = new TextNodeWarpper(child)
      dom.appendChild(child)
    }
  }
  processChildren(children)
  return dom
}