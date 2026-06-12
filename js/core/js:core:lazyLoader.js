// js/core/lazyLoader.js
export class LazyLoader {
  constructor() {
    this.modules = new Map();
  }

  async loadModule(name, importPromise) {
    if (this.modules.has(name)) return this.modules.get(name);
    const module = await importPromise;
    this.modules.set(name, module);
    return module;
  }

  preload(name, importPromise) {
    // start loading but don't wait
    importPromise.then(module => this.modules.set(name, module));
  }
}