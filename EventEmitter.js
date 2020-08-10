/**
 * 事件观察者模式
 */
class EventEmitter {
  constructor() {
    this.a = 'bbb';
    this.eventList = [];
  }

  getItem(name) {
    const eventItem = this.eventList.find((item) => item.name === name);
    return eventItem;
  }

  on(name, callback) {
    if (!this.getItem(name)) this.eventList.push({ name, callback });
  }

  once(name, callback) {
    if (!this.getItem(name)) {
      this.eventList.push({ name, callback, once: true });
    }
  }

  fire(name, params) {
    const eventItem = this.getItem(name);
    if (eventItem) {
      eventItem.callback(params);
      if (eventItem.once) this.off(name);
    }
  }

  off(name) {
    const eventItem = this.getItem(name);
    if (eventItem) {
      const index = this.eventList.indexOf(eventItem);
      this.eventList.splice(index, 1);
    }
  }
}

const a = 'aaa';
const emitter = new EventEmitter();
emitter.on('start', (param) => {
  console.log(param);
});

emitter.fire('start', 'start'); // start
emitter.fire('start', 'start'); // start

emitter.once('go', (param) => {
  console.log(param);
});

emitter.fire('go', 'go'); // go
emitter.fire('go', 'go'); // 不打印
