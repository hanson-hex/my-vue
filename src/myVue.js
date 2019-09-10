class MyVue {
  constructor (options) {
    this.$data = options.data
    this.observe(this.$data)
  }
  observe (value) {
    if (!value || typeof value !== 'object') {
      return
    }
    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key])
    })
  }
  defineReactive(obj, key, value) {
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        return value
      },
      set: function (newVal) {
        if (value === newVal) {
          return
        }
        value = newVal
        console.log('数据变化了')
      }
    })
  }
}