export class Dep {
  constructor () {
    this.deps = []
  }
  addDep (dep) {
    this.deps.push(dep)
  }
  notify () {
    this.deps.forEach(dep => {
      dep.update()
    })
  }
}

export class Watcher {
  constructor () {
    Dep.target = this
  }
  update () {
    console.log('视图更新了')
  }
}