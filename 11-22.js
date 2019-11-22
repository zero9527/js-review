/**
 * 私有属性，公有属性
 */
function fn() {
  // private
  var list = [];

  // public
  this.a = function() {
    console.log('a');
  }

  // public
  this.b = function() {
    console.log('b');
  }
}

const f = new fn();
console.log(f.list); // undefined
f.a(); // a
