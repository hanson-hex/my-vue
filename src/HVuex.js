 class HVuex {
  constructor (options) {
    this.state = options.state
    this.mutations = options.mutations
    this.actions = options.actions
    // 借由vue本身的响应式通知机制
    // state 会将需要的依赖在Dep中
    this._vm = new HVue({
      data: {
        $state: state
      }
    })
  }
  commit (type, payload, _options) {
    const entry = this.mutations[type]
    entry.forEach(handler => handler(payload))
  }

  dispatch (type, payload) {
    const entry = this.actions[type]
    return entry(payload)
  }
 }