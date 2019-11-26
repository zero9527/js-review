/**
 * this
 * 
### 3.1 箭头函数
看这位大佬的 [文章](https://juejin.im/post/5cfdb35af265da1bb96fd17b)

**箭头函数与普通函数的区别：**
* 没有 `this`
* 没有 `arguments`
* 无法 `call/bind/apply`
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

const obj = {
  a: 'a',
  fn: function() {
    console.log('fn: ', this); // { a: 'a', fn: [Function: fn] }
  }
};

obj.fn();

a.call(obj);
