let callBacks = new Map();
let useReactive = [];
let reactivites = new Map();

function effect(callBack){
  useReactive = [];
  // 先执行一遍callback，用来触发所涉及到变量的getter方法
  // 将涉及变量保存起来
  callBack();
  for (let reactivity of useReactive) {
    if(!callBacks.has(reactivity[0])){
      callBacks.set(reactivity[0], new Map());
    }
    if(!callBacks.get(reactivity[0]).has(reactivity[1])){
      callBacks.get(reactivity[0]).set(reactivity[1], [])
    }
    // 涉及对象属性下添加callback方法
    callBacks.get(reactivity[0]).get(reactivity[1]).push(callBack)
  }
  
}

function reactive(obj) {
  // 缓存 解决嵌套对象不通proxy的问题
  if(reactivites.has(obj)){
    return reactivites.get(obj)
  }
  let proxy =  new Proxy(obj, {
    set(target, prop,value){
      target[prop] = value;
      // 执行对应的callback
      if(callBacks.has(target) && callBacks.get(target).has(prop)){
        for (const callBack of callBacks.get(target).get(prop)) {
          callBack();
        }
      }
      return target[prop];
    },
    get(target, prop){
      // 涉及属性的注册
      useReactive.push([target, prop])
      if(typeof target[prop] === 'object')
        return reactive(target[prop])
      return target[prop];
    }
  })
  reactivites.set(obj, proxy);
  return proxy
}

