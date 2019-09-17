// 依赖收集
export class Dep {
  constructor () {
    // 存放所有的依赖
    this.deps = []
  }
  // dgps中添加一个监听的对象
  addDep (dep) {
    this.deps.push(dep)
  }
  // 通知所有监听器去更新视图
  notify () {
    this.deps.forEach(dep => {
      console.log('dep:', dep)
      dep.update()
    })
  }
}

export class Watcher {
  constructor (vm, key, cb) {
    // 在new一个监听器对象将该对象,赋值给Dep.target， 在get中会用到
    // 将Dep.target 指向自己
    // 然后触发属性的getter添加监听
    // 最后将Dep.target 置空
    this.vm = vm
    this.key = key
    Dep.target = this
    this.value = this.get()
    this.cb = cb
    Dep.target = null
  }
  get () {
    // Dep.target = this
    let value = this.vm[this.key]
    return value
  }
  // 更新视图的方法
  update () {
    console.log('视图更新了')
    this.value = this.get()
    this.cb.call(this.vm, this.value)
  }
}