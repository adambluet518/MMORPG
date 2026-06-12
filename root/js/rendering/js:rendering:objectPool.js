// js/rendering/objectPool.js
export class ObjectPool {
  constructor(createFn, initialSize = 20) {
    this.createFn = createFn;
    this.pool = [];
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.createFn());
    }
  }

  acquire() {
    if (this.pool.length > 0) {
      return this.pool.pop();
    }
    return this.createFn();
  }

  release(obj) {
    // reset object state
    this.pool.push(obj);
  }
}