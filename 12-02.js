/**
 * 给定一个字符串str和一个长度K，字符串由'-'分割成多个小串；
 * 求除了第一个小串外，所有小串按长度K，用'-'分割
 * @param {*} k 
 * @param {*} str 
 */
function strTransfer(k ,str) {
  if (typeof str !== 'string') return;
  var arr = str.split('-');
  var result = arr.shift();

  var arr1 = arr.join('').split('');

  while(arr1.length > 0) {
    result += '-' + arr1.splice(0, k).join('').toUpperCase();
  }

  return result;
}

var str = '25G3C-abc-d-ajshs';
var str1 = 'kfkkg-jsjjs';
var str2 = 123;
console.log(strTransfer(7, str));
console.log(strTransfer(2, str1));
console.log(strTransfer(2, str2));
