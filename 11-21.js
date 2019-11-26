/**
 * 动态规划
 * 1块，4块，5块，求总数N块的最小硬笔数
 * 思路：1、先求最大数的倍数 2、其中两个的组合（大数优先） 3、三个的组合
 */
function getCoinNum(N) {
  let n1 = 1;
  let n2 = 4;
  let n3 = 5;

  // 输出结果组合、最少数量，如：12: { result: '5*2,4*0,2*1', minCount: 4 }
  const getResult = (result, minCount) => ({ result, minCount });

  if (N < n2) return getResult(`${n1}*${N}`, N / n1);
  if (N === n1) return getResult(`${n1}*1`, 1);
  if (N === n2) return getResult(`${n2}*1`, 1);
  if (N%n3 === 0) return getResult(`${n3}*${N/n3}`, N/n3);

  for (var j = 0; j < N/n2; j++) {
    for (var k = 0; k < N/n3; k++) {
      if (N === n3 * k + n2 * j) return getResult(`${n3}*${k},${n2}*${j}`, j + k);
      if (N === n2 * j) return getResult(`${n2}*${j}`, j);

      // N - n3*k - n2*j) 结果小于 4，则剩下的由 1 组成
      if ((N - n3 * k - n2 * j) > 0 && (N - n3 * k - n2 * j) < n2) {
        return getResult(
          `${n3}*${k},${n2}*${j},${(N - n3 * k - n2 * j)}*1`,
          j + k + (N - n3 * k - n2 * j)
        );
      }
    }
  }
}

for (var i=0; i<=50; i++) console.log(`${i}: `, getCoinNum(i));
/**
 * 打印：
 * 0:  { result: '1*0', minCount: 0 }
1:  { result: '1*1', minCount: 1 }
2:  { result: '1*2', minCount: 2 }
3:  { result: '1*3', minCount: 3 }
4:  { result: '4*1', minCount: 1 }
5:  { result: '5*1', minCount: 1 }
6:  { result: '5*1,4*0,1*1', minCount: 2 }
7:  { result: '5*1,4*0,2*1', minCount: 3 }
8:  { result: '5*1,4*0,3*1', minCount: 4 }
9:  { result: '5*1,4*1', minCount: 2 }
10:  { result: '5*2', minCount: 2 }
11:  { result: '5*2,4*0,1*1', minCount: 3 }
12:  { result: '5*2,4*0,2*1', minCount: 4 }
13:  { result: '5*2,4*0,3*1', minCount: 5 }
14:  { result: '5*2,4*1', minCount: 3 }
15:  { result: '5*3', minCount: 3 }
16:  { result: '5*3,4*0,1*1', minCount: 4 }
17:  { result: '5*3,4*0,2*1', minCount: 5 }
18:  { result: '5*3,4*0,3*1', minCount: 6 }
19:  { result: '5*3,4*1', minCount: 4 }
20:  { result: '5*4', minCount: 4 }
21:  { result: '5*4,4*0,1*1', minCount: 5 }
22:  { result: '5*4,4*0,2*1', minCount: 6 }
23:  { result: '5*4,4*0,3*1', minCount: 7 }
24:  { result: '5*4,4*1', minCount: 5 }
25:  { result: '5*5', minCount: 5 }
26:  { result: '5*5,4*0,1*1', minCount: 6 }
27:  { result: '5*5,4*0,2*1', minCount: 7 }
28:  { result: '5*5,4*0,3*1', minCount: 8 }
29:  { result: '5*5,4*1', minCount: 6 }
30:  { result: '5*6', minCount: 6 }
31:  { result: '5*6,4*0,1*1', minCount: 7 }
32:  { result: '5*6,4*0,2*1', minCount: 8 }
33:  { result: '5*6,4*0,3*1', minCount: 9 }
34:  { result: '5*6,4*1', minCount: 7 }
35:  { result: '5*7', minCount: 7 }
36:  { result: '5*7,4*0,1*1', minCount: 8 }
37:  { result: '5*7,4*0,2*1', minCount: 9 }
38:  { result: '5*7,4*0,3*1', minCount: 10 }
39:  { result: '5*7,4*1', minCount: 8 }
40:  { result: '5*8', minCount: 8 }
41:  { result: '5*8,4*0,1*1', minCount: 9 }
42:  { result: '5*8,4*0,2*1', minCount: 10 }
43:  { result: '5*8,4*0,3*1', minCount: 11 }
44:  { result: '5*8,4*1', minCount: 9 }
45:  { result: '5*9', minCount: 9 }
46:  { result: '5*9,4*0,1*1', minCount: 10 }
47:  { result: '5*9,4*0,2*1', minCount: 11 }
48:  { result: '5*9,4*0,3*1', minCount: 12 }
49:  { result: '5*9,4*1', minCount: 10 }
50:  { result: '5*10', minCount: 10 }
 */


/**
 * 求斐波那契数列
 * n<=2时为1，从3开始，每个数等于前两个之和
 * @param {*} n 
 */
function fb2(n) {
  const arr = [];
  for (var i = 0; i <= n; i++) {
    arr.push(
      i <= 2 ? 1 : arr[i - 1] + arr[i - 2]
    )
  }
  return arr;
}

// console.log(fb2(15));
// [ 1, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610 ]
