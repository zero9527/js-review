/**
 * 二维数组旋转
 * 1、根据列数，新建一个二维数组
 * 2、遍历原数组，将最底层按列数，依次push进新数组
 */

const arr = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
];

let newArr = [[], [], [], []];
for (var i = 0; i < arr.length; i++) {
  for (var j = 0; j < arr[i].length; j++) {
    newArr[j].push(arr[i][j]);
  }
}

console.log(newArr);
