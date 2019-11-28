/**
 * this
 * 
### 3.1 箭头函数
看这位大佬的 [文章](https://juejin.im/post/5cfdb35af265da1bb96fd17b)

**箭头函数与普通函数的区别：**
* 没有 `this`
* 没有 `arguments`
* 无法 `call/bind/apply` 切换 `this`
* 没有原型
* 没有构造函数，不能 `new` 

 */
function a() {
  // 如果 a.call(obj)，则是 { a: 'a', fn: [Function: fn] }，
  // 否则 global/Window
  console.log('a: ', this); 
  
  b();
  function b() {
    console.log('b: ', this); // global/Window
    c();
    function c() {
      console.log('c: ', this); // global/Window
    }
  }
}

// const obj = {
//   a: 'a',
//   fn: function() {
//     console.log('fn: ', this); // { a: 'a', fn: [Function: fn] }
//   }
// };

// obj.fn();

// a.call(obj);


/**
 * bind/call/apply
 */
// 测试
var a = 'window-a';
var obj = {
  a: 'obj-a',
  fn: function(c, d) {
    console.log('a:', this.a);
    console.log('c:', c);
    console.log('d:', d);
  }
};
var obj2 = {
  a: 'obj2-a'
};
var obj3 = {
  a: 'obj3-a'
};

/**
 * call
 * 切换上下文，立即执行，参数展开非数组
 * @param {*} ctx 执行上下文
 */
Function.prototype._call = function(ctx) {
  ctx = ctx || {};
  ctx.fn = this;

  var args = [];
  // 展开参数
  // arguments[0] 是 ctx.fn 函数
  for(var i=1; i<arguments.length; i++) {
    args.push('arguments['+ i +']');
  }

  var res = eval('ctx.fn('+ args +')')
  
  delete ctx.fn;
  return res;
}

// // a: obj2-a, c: cc2, d: dd2
// obj.fn._call(obj2, 'cc2', 'dd2'); 

// // a: obj3-a, c: cc3, d: dd3
// obj.fn._call(obj3, 'cc3', 'dd3'); 

// // a: window-a, c: cc-null, d: dd
// obj.fn._call(null, 'cc-null', 'dd'); 

// // a: window-a, c: cc-undefined, d: dd
// obj.fn._call(undefined, 'cc-undefined', 'dd'); 


/**
 * apply
 * 切换上下文，立即执行，参数为数组
 * @param {*} ctx 执行上下文
 */
Function.prototype._apply = function(ctx) {
  if (
    arguments.length > 2 ||
    Object.prototype.toString.call(arguments[1]) !== '[object Array]'
  ) {
    console.warn('参数只能一个，且为数组！');
    return;
  }
  ctx = ctx || {};
  ctx.fn = this;

  var args = [];
  for(var i=0; i<arguments[1].length; i++) {
    args.push('arguments[1]['+ i +']');
  }

  var res = eval('ctx.fn('+ args +')');

  delete ctx.fn;
  return res;
}

// // a: obj-a, c: cc, d: dd
// obj.fn('cc', 'dd');

// // a: obj2-a, c: cc2, d: dd2
// obj.fn._apply(obj2, ['cc2', 'dd2']);

// // a: obj3-a, c: cc3, d: dd3
// obj.fn._apply(obj3, ['cc3', 'dd3']);

// // a: window-a, c: cc-null, d: dd-null
// obj.fn._apply(null, ['cc-null', 'dd-null']);

// // a: window-a, c: cc-undefined, d: dd-undefined
// obj.fn._apply(undefined, ['cc-undefined', 'dd-undefined']);


/**
 * bind
 * 切换上下文，返回一个新函数；不会立即执行
 * @param {*} ctx 执行上下文
 */
Function.prototype._bind = function(ctx) {
  ctx = ctx || {};
  ctx.fn = this;

  var args = [];
  // 展开参数
  // arguments[0] 是 ctx.fn 函数
  for (var i=1; i<arguments.length; i++) {
    args.push('arguments['+ i +']');
  }
  
  var res = eval('ctx.fn(' + args +')');

  delete ctx.fn;
  return function() {
    res;
  };
}

// obj.fn('c', 'd'); // a: obj-a, c: c, d: d

// var fn1 = obj.fn._bind(null, 'cc1', 'dd1');
// fn1(); // a: window-a, c: cc1, dd1

// var fn2 = obj.fn._bind(obj2, 'cc2', 'dd2');
// fn2(); // a: obj2-a, c: cc2, d: dd2

// var fn3 = obj.fn._bind(obj3, 'cc3', 'dd3');
// fn3(); // a: obj3-a, c: cc3, d: dd3

// // 这个时候是不能再绑定的，所以打印的是第一次绑定的内容
// fn3.bind(obj2, 'cc2', 'dd2');
// fn3(); // a: obj3-a, c: cc3, d: dd3

/**
内部函数，私有变量

* 闭包：有权访问外部作用域的私有变量的函数；
* 被闭包引用的变量不会被自动清理(gc)

也可以这么理解：函数的内部函数引用外部的私有变量，那么内部函数就是闭包；

 */
function f1() {
  var a = 0;
  var b = 0;
  var c = 0;

  return function() {
    var d = a++;
    var e = d;
    var f = c++;
    console.log(d, e, f);
  }
}

var ff = f1();
ff();
ff();

// // 10个10
// for (var i=0; i<10; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 0);
// }

// // 0-9
// for (var i=0; i<10; i++) {
//   setTimeout((j) => {
//     console.log(j);
//   }, 0, i);
// }

// // 0-9
// for (var i=0; i<10; i++) {
//   (function(j) {
//     setTimeout(() => {
//       console.log(j);
//     }, 0)
//   })(i)
// }

// // 0-9
// for (let i=0; i<10; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 0);
// }

// 10个10
// let i;
// for (i=0; i<10; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 0);
// }