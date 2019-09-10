import { Watcher, Dep } from './observer'

export class MyVue {
  constructor (options) {
    this.$data = options.data
    this.observe(this.$data)

    new Watcher()

    console.log('模拟render 触发test的getter', this.$data.text)
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
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        dep.addDep(Dep.target)
        return value
      },
      set: function (newVal) {
        if (value === newVal) {
          return
        }
        value = newVal
        console.log('数据变化了')
        dep.notify()
      }
    })
  }
}


