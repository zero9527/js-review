/**
 * 浅拷贝
 */
function clone(obj) {
  var objType = Object.prototype.toString.call(obj);
  if (objType !== '[object Object]') return;

  var newObj = {};
  Object.keys(obj).forEach(item => {
    newObj[item] = obj[item];
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

/**
 * 深拷贝
 * 判断obj是否对象或数组，否的话直接返回；
 * 是的话，对象则给新变量初始化为对象 {}，数组则 []，
 * 然后 循环判断每个key，key的值是对象或数组的话继续循环
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
    if (isObjectOrArray(objArr[item])) {
      newObjArr[item] = deepClone(objArr[item]);

    } else {
      newObjArr[item] = objArr[item];
    }
  })

  return newObjArr; 
}

var obj3 = {
  a: 'a',
  b: {
    c: 'c1'
  },
  d: [0, 1]
};

var obj4 = deepClone(obj3);
console.log(obj4); // { a: 'a', b: { c: 'c1' }, d: [ 0, 1 ] }
obj4.a = 'a2';
obj4.b.c = 'c2';
obj4.d[0] = 1;
console.log(obj4); // { a: 'a2', b: { c: 'c2' }, d: [ 1, 1 ] }
console.log(obj3); // { a: 'a', b: { c: 'c1' }, d: [ 0, 1 ] }
