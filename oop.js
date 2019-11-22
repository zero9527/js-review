/**
 * 面向对象三大特性：封装、继承、多态
 */
function Animal(place) {
  this.place = place;
  this.type = 'animal';

  this.run = function(m) {
    console.log('run: ', m);
  }
}
Animal.prototype = {
  a: 'a'
}

/**
 * 继承方式1: 原型，可以继承父类内置方法、原型属性
 * 缺点：不能向构造函数传参数；与父类共享，互相影响
 */
function Cat1() {
  this.c = 'c';
}
Cat1.prototype = new Animal();

console.log('-------- 1 ---------');
const cc1 = new Cat1();
console.log(cc1.type); // animal
console.log(cc1.a); // a
console.log(cc1.place); // undefined
cc1.run(2); // 2


/**
 * 继承方式2: apply，继承父类内置方法
 * 缺点：无法继承父类的原型属性
 * 解决：看方法3、方法4
 */
function Cat2() {
  // Animal.apply(this, arguments);
  Animal.apply(this, ['深圳']);
  // this.type = 'cat'; // 会覆盖上面继承的东西
  this.c = 'c';
}

console.log('--------- 2 --------');
const cc2 = new Cat2();
console.log(cc2.type); // animal
console.log(cc2.a); // undefined
console.log(cc2.place); // 深圳
cc2.run(2); // 2


/**
 * 继承方式3: Object.create，继承父类的原型属性
 * 缺点：不能向构造函数传参数；
 * 解决：与方式2一起用
 */
function Cat3() {
  // Animal.apply(this, arguments);
  Animal.apply(this, ['深圳']);
  // this.type = 'cat'; // 会覆盖上面继承的东西
  this.c = 'c';
}
Cat3.prototype = Object.create(Animal.prototype);
Cat3.prototype.constructor = Cat3;

console.log('--------- 3 --------');
const cc3 = new Cat3();
console.log(cc3.type); // animal
console.log(cc3.a); // a
console.log(cc3.place); // 深圳
cc3.run(2); // 2


/**
 * 继承方式4: 寄生+组合
 * 缺点：无法继承父类内置方法
 * 解决：与方式2一起用
 */
function Cat4() {
  // Animal.apply(this, arguments);
  Animal.apply(this, ['深圳']);
  // this.type = 'cat'; // 会覆盖上面继承的东西
  this.c = 'c';
}
function extend(Child, Parent) {
  var fn = function() {};
  fn.prototype = Parent.prototype;
  Child.prototype = new fn();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}

extend(Cat4, Animal);

console.log('--------- 4 --------');
const cc4 = new Cat4();
console.log(cc4.type); // animal
console.log(cc4.a); // a
console.log(cc4.place); // 深圳
cc4.run(2); // 2
