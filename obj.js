/**
 * 对象类型转换时(`==`)，调用 valueOf 方法
 */
var a = {
  value: 0,
  valueOf: function() {
    this.value++
    console.log('value: ', this.value);
    return this.value;
  }
};

console.log(a == 1 && a == 2);
