/**
 * 
## 事件循环 Event Loop
浏览器是单线程，一旦遇到异步任务就会把其中的内容放到任务队列 Task；
然后浏览器在执行同步任务的同时，不断轮询任务队列，如果任务队列中有任务，会按照 **先进先出** 的顺序执行；一般来说任务队列中都是宏任务

### 异步任务
分为微任务 Micro Task，宏任务 Macro Task；

**任务队列** 中的宏任务会在上一个宏任务执行完时执行；

**微任务** 则是在主线程空闲时（如每一个宏任务执行完）执行；期间有新的微任务会继续执行，微任务都执行完才会继续轮询任务队列；

#### 宏任务 Macro Task
* 浏览器 <br />
    `setTimeout`, `setInterval`, `requestAnimationFrame`, `I/O`
* Node.js <br />
    `setTimeout`, `setInterval`, `setImmediate`

#### 微任务 Micro Task
* 浏览器 <br />
    `Promsie.then`, `Promsie.catch`, `Promsie.finally`, `MutationObserver`
* Node.js <br />
    `Promsie.then`, `Promsie.catch`, `Promsie.finally`, `process.nextTick`

 */
console.log('Start!');

setTimeout(() => {
  console.log('setTimeout1')
}, 0);

new Promise((resolve, reject) => {
  console.log('Promise');
  resolve();

  setTimeout(() => {
    console.log('setTimeout2');
  }, 0);

  Promise.resolve().then(() => {
    console.log('then2');
  })
}).then(() => {
  console.log('then1');
})

console.log('End!');

// Start, Promise, End, then2, then1, setTimeout1, setTimeout2;