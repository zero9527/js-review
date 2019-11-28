/**
 * 数组去重
 * 简单数组按照 `item` 去重；
 * 复杂数组按照 `item[key]` 去重；
 * @param {*} arr 
 * @param {*} key 去重的 key，可选
 */
function uniarr(arr, key) {
  var getType = o => Object.prototype.toString.call(o);
  if (getType(arr) !== '[object Array]') return arr;

  if (key && !arr[0].hasOwnProperty(key)) {
    console.warn(arr, '[item] 不存在key: '+key);
    return [];
  }

  var newArr = [];
  arr.forEach(item => {
    var arrItem = key 
      ? item.hasOwnProperty(key) ? item[key] : item 
      : item;

    var hasItem = newArr.some(newitem => {
      return (key ? newitem[key] === arrItem : newitem === arrItem)
    });

    if(!hasItem) newArr.push(item);
  })

  return newArr;
}

// var list1 = [1,2,3,4,5,6,1,2,3];
// console.log(uniarr(list1)); // [ 1, 2, 3, 4, 5, 6 ]

// var list2 = [{id: 1}, {id: 2}, {id: 3}, {id: 2}];
// console.log(uniarr(list2, 'id')); 
// //[ { id: 1 }, { id: 2 }, { id: 3 } ]

// console.log(uniarr(list2, 'id1'));
// // [ { id: 1 }, { id: 2 }, { id: 3 }, { id: 2 } ] '[item] 不存在 key:  id1'
// // []


/**
 * 数组扁平化
 * 判断 `item` 是否数组，否的话直接 push 到新数组，
 * 是的话递归 
 * @param {*} arr 
 */
function singlearr(arr) {
  var getType = o => Object.prototype.toString.call(o);
  if (getType(arr) !== '[object Array]') return arr;

  var newArr = [];
  arr.forEach(item => {
    getType(item) === '[object Array]'
      ? newArr = newArr.concat(singlearr(item))
      : newArr.push(item)
  })

  return newArr;
}

// var list1 = [1,2,[3,4],[5,[6,7]]];
// console.log(singlearr(list1));


/**
 * 字符串前后去空格
 */
String.prototype._trim = function() {
  var str = this;
  return str.replace(/^\s|\s$/g,'');
}

// var str = ' st r ';
// console.log(str.split('')); // [ ' ', 's', 't', ' ', 'r', ' ' ]
// console.log(str._trim().split('')); // [ 's', 't', ' ', 'r' ]


/**
 * 获取 URL 参数
 * 默认返回 `url` 转化的 `key/value` 对象，
 * 有传 `key` 且 `url` 转化的对象有这个 `key` 的时候，直接返回值
 * @param {*} url 形如 a=1&b=2
 * @param {*} key 
 */
function urlUtil(url, key) {
  if (typeof url !== 'string') return;
  if (!url.includes('=')) return url;
  
  var obj = {};
  url.split('&').forEach(item => {
    const [key, value] = item.split('=');
    obj[key] = value;
  })

  if (key && obj.hasOwnProperty(key)) {
    return obj[key];
  }

  if (key && !obj.hasOwnProperty(key)) {
    console.warn(`url: ${url} 中不存在 ${key} 字段`);
    return;
  }

  return obj;
}

// var url = 1;
// console.log(urlUtil(url)); // a

// var url1 = 'a=1';
// console.log(urlUtil(url1)); // { a: '1' }
// console.log(urlUtil(url1, 'a')); // 1
// console.log(urlUtil(url1, 'b')); // url: a=1 中不存在 b 字段 undefined

// var url2 = 'a=1&b=2';
// console.log(urlUtil(url2)); // { a: '1', b: '2' }
// console.log(urlUtil(url2, 'a')); // 1
// console.log(urlUtil(url2, 'b')); // 2

/**
 * 数字千分号
 * @param {*} num 
 */
function numThousand(num) {
  if (typeof (num-0) !== 'number') return num;
  if (num.length < 4) return num;

  // 正则
  // var newNum = (num+'').replace(
  //   /(\d)(?=(?:\d{3})+$)/g, 
  //   '$1,'
  // );

  // 函数
  var newNum = (num+'').split('');
  var arr = [];
  do {
    // 从后面开始分割
    var start = newNum.length > 3 ? newNum.length - 3 : 0;
    arr.push(newNum.splice(start, newNum.length).join(''));
  } while(newNum.length > 0)

  newNum = arr.reverse().join(',');
  delete arr;

  return newNum;
}

var num1 = 1234567;
console.log(numThousand(num1)); // 1,234,567

var num2 = 123;
console.log(numThousand(num2)); // 123

var num3 = '123';
console.log(numThousand(num3)); // 123

var num4 = '12345';
console.log(numThousand(num4)); // 12,345

var card = '62564749929292';
// 62,564,749,929,292
console.log(numThousand(card)); 

/**
 * 字符按长度分割
 * @param {*} num 数字
 * @param {*} len 分割的长度，默认三位
 * @param {*} sep 千分号分隔符 默认 ','
 */
function stringSeparate(str, {len = 3, sep = ','} = {}) {
  if (typeof (str+'') !== 'string') return str;
  if (str.length < 4) return str;

  var newStr = (str+'').split('');
  var arr = [];
  do {
    arr.push(newStr.splice(0, len).join(''));
  } while(newStr.length > 0)

  newStr = arr.join(sep);
  delete arr;

  return newStr;
}

// var num1 = 1234567;
// console.log(stringSeparate(num1)); // 123,456,7

// var num2 = 123;
// console.log(stringSeparate(num2)); // 123

// var num3 = '123';
// console.log(stringSeparate(num3)); // 123

// var num4 = '12345';
// console.log(stringSeparate(num4)); // 123,45

// var card = '6217123456789012345';
// // 6217 1234 5678 9012 345
// console.log(stringSeparate(card, {len: 4, sep: ' '})); 
