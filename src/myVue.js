import { Watcher, Dep } from './observer'
import { Comile } from './compile'
export class MyVue {
  constructor (options) {
    this.$data = options.data
    this.$options = options
    this.observe(this.$data)

    // 新建一个watcher 观察者对象, 这个时候Dep.targt指向这个watcher
    // new Watcher()

    // 模拟render的过程啊， 微课触发text属性的get函数
    // console.log('模拟render 触发test的getter', this.$data.text)
    if (options.created) {
      options.created.call(this)
    }
    this.$compile = new Comile(options.el, this)
  }
  observe (value) {
    if (!value || typeof value !== 'object') {
      return
    }
    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key])
      this.proxyData(key)
    })
  }
  proxyData (key) {
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get () {
        return this.$data[key]
      },
      set (newVal) {
        this.$data[key] = newVal
      }
    })
  }
  defineReactive(obj, key, value) {
    this.observe(value)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        // 将当时的watcher对象存入Dep的deps中
        Dep.target && dep.addDep(Dep.target)
        return value
      },
      set: function (newVal) {
        if (value === newVal) {
          return
        }
        value = newVal
        console.log('数据变化了')
        // set的时候触发nofify通知所有的wather对象更新视图
        dep.notify()
      }
    })
  }
}
