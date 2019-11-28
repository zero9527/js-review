/**
 * Array.sort
 * 接收一个函数，函数的参数一为 `当前 item`，参数二为 `下一个 item`
 * 按照函数的返回值为 true 的顺序排序，
 * 返回一个新数组
 * 
 * ++++++ 未完 ++++++
 */
Array.prototype._sort = function(cb) {
  var arr = this;

  for (var i=0; i<arr.length; i++) {
    for (var j=i; j<arr.length; j++) {
      // 大于0时升序，小于0时降序；默认升序
      // var asc = cb ? Boolean(cb(1, 0) > 0) : true;
      var asc = cb ? Boolean(
        cb(arr[i], arr[i+1]) > 0
      ) : true;
      
      var temp = '';

      if (asc && arr[i] > arr[j]) {
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      } 
      if (!asc && arr[i] < arr[j]) {
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
    }
  }

  return arr;
}

// var arr = [1,3,4,12,34,5,22,8];
// console.log(arr._sort()); // [ 1, 3, 4, 5, 8, 12, 22, 34 ]
// console.log(arr._sort((x, y) => {
//   console.log('x, y:', x, y);
//   return x - y;
// })); // [ 1, 3, 4, 5, 8, 12, 22, 34 ]
// console.log(arr._sort((x, y) => y - x)); // [ 34, 22, 12, 8, 5, 4, 3, 1 ]

// var arr1 = ['a', 'q', 'g', 'd'];
// console.log(arr1._sort()); // [ 'a', 'd', 'g', 'q' ]


/**
 * 冒泡排序
 * @param {*} arr 
 */
function BubbleSort(arr){
  const getType = o => Object.prototype.toString.call(o);
  if (getType(arr) !== '[object Array]') return arr;

  for (var i=0; i<arr.length; i++) {
    for (var j=i+1; j<arr.length; j++) {
      var temp = '';
      if (arr[i] > arr[j]) {
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }

  return arr;
}

// var arr = [1,3,4,12,34,5,22,8];
// console.log(arr.sort((x, y) => x-y)); // [ 1, 3, 4, 5, 8, 12, 22, 34 ]
// console.log(BubbleSort(arr)); // [ 1, 3, 4, 5, 8, 12, 22, 34 ]

/**
 * 快速排序 
 * 取一个参考值，然后将剩下的分为两份，一份大于参考值的 `left: []`，一份小于参考值 `right: []`
 * 然后分别递归 `left/right`, 返回一个 `left+mid+right` 组成的数组
 * @param {*} arr 排序的数组
 * @param {*} key 一级 key 
 */
function FastSort(arr, key) {
  const getType = o => Object.prototype.toString.call(o);
  if (getType(arr) !== '[object Array]') return arr;
  if (arr.length <= 1) return arr;

  if (key && !arr[0].hasOwnProperty(key)) {
    console.warn(arr, '[item] 不存在key: '+key);
    return [];
  }
  if (!key && getType(arr[0]) === '[object Object]') {
    console.warn('传一个 key 作为排序字段');
    return [];
  }

  var mid = arr.shift();
  var left = [];
  var right = [];

  arr.forEach(item => {
    var arrItem = key 
      ? item.hasOwnProperty(key) ? item[key] : item
      : item;
    
    var midItem = key
      ? item.hasOwnProperty(key) ? mid[key] : mid
      : mid;

      arrItem <= midItem ? left.push(item) : right.push(item);
  });

  return FastSort(left, key).concat(mid).concat(FastSort(right, key));
}

var arr = [1,3,4,12,34,654,89,1,66,12,23,45,10,230,342,980];
// [ 1, 1, 3, 4, 10, 12, 12, 23, 34, 45, 66, 89, 230, 342, 654, 980 ]
console.log(FastSort(arr));

var arr1 = [{num: 10}, {num: 26}, {num: 8}, {num: 36}];
// 传一个 key 作为排序字段, []
console.log(FastSort(arr1));

// [ { num: 8 }, { num: 10 }, { num: 26 }, { num: 36 } ]
console.log(FastSort(arr1, 'num'));
