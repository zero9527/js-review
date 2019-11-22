/**
 * this
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
