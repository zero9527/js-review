/**
 * 浅拷贝
 * 只拷贝一层 key，如果这个 key 是复杂数据类型（Object/Array）的话，有引用赋值
 */
function clone(objArr) {
  var getType = o => Object.prototype.toString.call(o);
  var isObjectOrArray = o => (
    getType(o) === '[object Object]' 
    || getType(o) === '[object Array]'
  );
  if (!isObjectOrArray(objArr)) return objArr;

  var newObj = getType(objArr) === '[object Object]' ? {} : [];
  Object.keys(objArr).forEach(item => {
    newObj[item] = objArr[item];
  })
  return newObj;
}

var obj1 = {
  a: 'a',
  b: {
    c: 'c1'
  }
};

// var obj2 = clone(obj1);
// console.log(obj2); // { a: 'a', b: { c: 'c1' } }
// obj2.a = 'a2';
// obj2.b.c = 'c2';
// console.log(obj2); // { a: 'a2', b: { c: 'c2' } }
// console.log(obj1); // { a: 'a', b: { c: 'c2' } }

// var arr1 = [1, [3]];
// var arr2 = clone(arr1);
// console.log(arr2); // [ 1, [ 3 ] ]
// arr2[0] = 2;
// arr2[1][0] = 4;
// console.log(arr2); // [ 2, [ 4 ] ]
// console.log(arr1); // [ 1, [ 4 ] ]


/**
 * 深拷贝
 * 判断 `objArr` 是否对象或数组，否的话直接返回；
 * 是的话，对象则给新变量初始化为对象 `{}`，数组则 `[]`，
 * 然后 循环判断每个 `key`，`key` 的值是对象或数组的话 递归执行
 */
function deepClone(objArr) {
  var getType = o => Object.prototype.toString.call(o);
  var isObjectOrArray = o => (
    getType(o) === '[object Object]' 
    || getType(o) === '[object Array]'
  );
  if (!isObjectOrArray(objArr)) return objArr;

  var newObjArr = getType(objArr) === '[object Object]' ? {} : [];

  Object.keys(objArr).forEach(item => {
    newObjArr[item] = isObjectOrArray(objArr[item])
      ? deepClone(objArr[item])
      : objArr[item]
  })

  return newObjArr; 
}

var obj3 = {
  a: 'a',
  b: {
    c: 'c1',
    e: {
      f: 'f'
    }
  },
  d: [0, 1, [2]]
};

var obj4 = deepClone(obj3);
console.log(obj4); // { a: 'a', b: { c: 'c1', e: { f: 'f' } }, d: [ 0, 1, [ 2 ] ] }
obj4.a = 'a2';
obj4.b.c = 'c2';
obj4.b.e.f = 'f1';
obj4.d[0] = 1;
obj4.d[2][0] = 3;
console.log(obj4); // { a: 'a2', b: { c: 'c2', e: { f: 'f1' } }, d: [ 1, 1, [ 3 ] ] }
console.log(obj3); // { a: 'a', b: { c: 'c1', e: { f: 'f' } }, d: [ 0, 1, [ 2 ] ] }
