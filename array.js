/**
 * ES6 数组的一些方法的实现
 */

// 测试
var arr = [
  { a: 'a1', b: 'b1', c: ['c1'], d: 'd' },
  { a: 'a2', b: 'b1', c: ['c2'], d: 'd' },
  { a: 'a3', b: 'b2', c: ['c2'], d: 'd' },
  { a: 'a4', b: 'b3', c: ['c3'], d: 'd' },
];

/**
 * Array.prototype.map
 * 将 `item`，`循环序列号`，`当前数组` 作为参数传给回调函数；
 * 回调函数的返回值作为 `item`，返回一个与原数组一样长度的新数组
 */
Array.prototype._map = function(cb) {
  var arr = this;
  var _this = arguments[1] || window;
  var newArr = [];

  // while 写法
  var i = 0;
  while(i < arr.length) {
    newArr.push(cb.call(_this, arr[i], i, arr));
    i++;
  }
  
  // for 循环写法：
  // for(var i=0; i<arr.length; i++) {
  //   newArr.push(cb.call(_this, arr[i], i, arr));
  // }

  return newArr;
}

// var arr1 = arr._map(function(item) {
//   console.log('this: ', this); // { a: 'aaaa' }
//   return item.a
// }, { a: 'aaaa' });
// var arr2 = arr._map(item => item.b);
// var arr3 = arr._map(item => {
//   return {
//     a: 'aa',
//     b: item.b
//   }
// });
// console.log(arr1); // [ 'a1', 'a2', 'a3', 'a4' ]
// console.log(arr2); // [ 'b1', 'b1', 'b2', 'b3' ]
// console.log(arr3);
/**
[ { a: 'aa', b: 'b1' },
  { a: 'aa', b: 'b1' },
  { a: 'aa', b: 'b2' },
  { a: 'aa', b: 'b3' } ]
 */


/**
 * Array.prototype.forEach
 * for 循环，将 `item`，`循环序列号`，`当前数组` 作为参数传给回调函数；循环直接执行回调函数
 * 语法：arr.forEach(callback(currentValue [, index [, array]])[, thisArg]);
 */
Array.prototype._forEach = function(cb) {
  var arr = this;
  var _this = arguments[1] || window;
  var i = 0;

  while(i < arr.length) {
    cb.call(_this, arr[i], i, arr);
    i++;
  }
}

// arr._forEach(function(item) {
//   console.log('this: ', this); // this:  { a: 'aaaa' }

//   item.a = 'aa';
//   item['d'] = 'dd';
// }, { a: 'aaaa' });
// console.log(arr);
/**
[ { a: 'aa', b: 'b1', c: [ 'c1' ], d: 'dd' },
  { a: 'aa', b: 'b1', c: [ 'c2' ], d: 'dd' },
  { a: 'aa', b: 'b2', c: [ 'c2' ], d: 'dd' },
  { a: 'aa', b: 'b3', c: [ 'c3' ], d: 'dd' } ]
 */


/**
 * Array.prototype.filter
 * 将 `item`，`循环序列号`，`当前数组` 作为参数传给回调函数；
 * 回调函数的返回值作为条件，去过滤原数组，返回符合条件的 `item` 组成的数组
 */
Array.prototype._filter = function(cb) {
  var arr = this;
  var _this = arguments[1] || window;
  var newArr = [];
  var i = 0;

  while(i < arr.length) {
    var res = Boolean(cb.call(_this, arr[i], i, arr));
    if (res) newArr.push(arr[i]);
    i++;
  }

  return newArr;
}

// var arr1 = arr._filter(function(item) {
//   console.log('this: ', this); // { a: 'aaaa' }
//   return item.a === 'a1'
// }, { a: 'aaaa' });
// var arr2 = arr._filter(item => item);
// console.log(arr1); // [ { a: 'a1', b: 'b1', c: [ 'c1' ], d: 'd' } ]
// console.log(arr2);
/**
[ { a: 'a1', b: 'b1', c: [ 'c1' ], d: 'd' },
  { a: 'a2', b: 'b1', c: [ 'c2' ], d: 'd' } ]
 */


/**
 * Array.prototype.find
 * 将 `item`，`循环序列号`，`当前数组` 作为参数传给回调函数；
 * 回调函数的返回值作为条件，只找一个，返回第一个符合条件的 `item` 
 */
Array.prototype._find = function(cb) {
  var arr = this;
  var _this = arguments[1] || window;
  var item = null;
  var i = 0;

  while(i < arr.length && item === null) {
    if (Boolean(cb.call(_this, arr[i], i, arr))) {
      item = arr[i];
    }
    i++;
  }

  return item;
}

// var item1 = arr._find(item => item);
// var item2 = arr._find(function(item) {
//   console.log('this: ', this); // { a: 'aaaa' }
//   return item.b === 'b1'
// }, { a: 'aaaa' });
// var item3 = arr._find(item => item.b === 'b2');
// console.log(item1); // { a: 'a1', b: 'b1', c: [ 'c1' ], d: 'd' }
// console.log(item2); // { a: 'a1', b: 'b1', c: [ 'c1' ], d: 'd' }
// console.log(item3); // { a: 'a3', b: 'b2', c: [ 'c2' ], d: 'd' }


/**
 * Array.prototype.every
 * 将 `item`，`循环序列号`，`当前数组` 作为参数传给回调函数；
 * 回调函数的返回值作为条件，判断是否所有 `item` 符合；也可以反向用 `Array.some` 找一个不符合的来替代
 */
Array.prototype._every = function(cb) {
  var arr = this;
  var _this = arguments[1] || window;
  var result = false;
  var i = 0;

  while(i < arr.length) {
    result = Boolean(cb.call(_this, arr[i], i, arr));
    i++;
  }

  return result;
}

// var res1 = arr._every(function(item) {
//   console.log('this: ', this); // { a: 'aaaa' }
//   return item.d === 'd'
// }, { a: 'aaaa' });
// var res2 = arr._every(item => item.a === 'a');
// console.log(res1); // true
// console.log(res2); // false


/**
 * Array.prototype.some
 * 将 `item`，`循环序列号`，`当前数组` 作为参数传给回调函数；
 * 查找符合条件的 `item`，只找一个，返回 `Boolean`
 */
Array.prototype._some = function(cb) {
  var arr = this;
  var _this = arguments[1] || window;
  var result = false;
  var i = 0;

  while(i < arr.length && !result) {
    result = Boolean(cb.call(_this, arr[i], i, arr));
    i++;
  }

  return result;
}

// var has_a1 = arr._some(function(item) {
//   console.log('this: ', this); // { a: 'aaaa' }
//   return item.a === 'a1'
// }, { a: 'aaaa' });
// console.log(has_a1); // true

// var has_b = arr._some(item => item.b === 'b');
// console.log(has_b); // false

// var has_b1 = arr._some(item => item.b === 'b1');
// console.log(has_b1); // true


/**
 * Array.prototype.reduce
 * 将 `item`，`循环序列号`，`当前数组` 作为参数传给回调函数；
 * 累计循环；两个参数，第一个为函数（其中，第一个形参为第二个参数），第二个参数可不传;
 * 回调函数的返回值作为下次回调的第二个参数，最终返回回调函数的返回值
 */
Array.prototype._reduce = function(cb) {
  var arr = this;
  var i = 0;
  var cb = arguments[0];  // 第一个参数，回调函数
  var acc = arguments[1] || null; // 第二个参数

  while(i < arr.length) {
    acc = cb(acc, arr[i], i, arr);
    i++;
  }

  return acc;
}

// // 求和
// var list = [1,2,3,4,5,6,7,8,9];
// var result = list._reduce((acc, cur) => acc + cur, 0);
// console.log(result); // 45

// // 统计某个字符出现的次数
// var list2 = ['aa', 'bb', 'jj', 'cc', 'dd', 'aa', 'b1'];
// var result2 = list2._reduce((acc, cur) => {
//   acc[cur] ? acc[cur]++ : acc[cur] = 1;
//   return acc;
// }, {});
// console.log(result2); // { aa: 2, bb: 1, jj: 1, cc: 1, dd: 1 }
