class Dog{
  constructor(name){
    this.name = name;
  }

  bite(){
    return `${this.name}咬了`
  }
}

class Cat{
  constructor(name){
    this.name = name;
  }

  bite(){
    return `${this.name}挠了`
  }
}

class Person{
  constructor(name){
    this.name = name;
  }
  hurt(behavior){
    return `${this.name}被 ${behavior}`;
  }
}

let p = new Person('人')
let cat = new Cat('猫')
let dog = new Dog('狗')
console.log(p.hurt(cat.bite()))
console.log(p.hurt(dog.bite()))