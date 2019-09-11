class Comile {
  constructor (el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    if (this.$el) {
      this.$fragment = this.node2Fragment(this.$el)
      this.complieElement(this.$fragment)
      this.$el.appendChild(this.$fragment)
    }
  }
  node2Fragment (el) {
    // 新建文档碎片
    let fragment = document.createDocumentFragment()
    let child
    // 原生节点拷贝到frament 这是是移动操作
    while (child = el.firstChild) {
      fragment.appendChild(child)
    }
    return fragment
  }
  complieElement (el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      let text = node.textContent
      // 表达式
      // 识别{{}}数据
      let reg = /\{\{(.*)\}\}/
      if (this.isElementNode(node)) {
        this.compile(node)
      } else if (this.isTextNode(node) && reg.test(text)) {
        this.comileText(node, RegExp.$1)
      }
      if (node.childNodes && node.childNodes.length) {
        this.complieElement(node)
      }
    })
  }
  compile (node) {
    let nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      let attrName = attr.name
      let exp = attr.value
      if (this.isDirective(attrName)) {
        let dir = attrName.substring(2)
        this[dir] && this[dir](node, this.$vm, exp)
      }
      if (this.isEventDirective(attrName)) {
        let dir = attrName.substring(1)
        this.eventHandler(node, this.$vm, exp, dir)
      }
    })
  }
  comileText (node, exp) {
    this.text(node, this.$vm, exp)
  }
  isDirective (attr) {
    return attr.indexOf('h-') === 0
  }
  isEventDirectve (dir) {
    return dir.indexOf('@') === 0
  }
  isElementNode (node) {
    return node.nodeType == 1
  }
  isTextNode (node) {
    return node.nodeType == 3
  }
  text (node, vm, exp) {
    this.udpate(node, vm, exp, 'text')
  }
  html (node, vm, exp) {
    this.update(node, vm, exp, 'html')
  }
  model (node, vm, exp) {
    this.update(node, vm, exp, 'model')
    let val = vm.exp
    node.addEventListener('input', e => {
      let newValue = e.target.value
      vm[exp] = newValue
      val = newValue
    })
  }
  update (node, vm, exp, dir) {
    let updateFn = this[dir + 'Updater']
    updateFn && updateFn(node, vm[exp])
    new watcher(vm, exp, function (value) {
      updateFn && updateFn(node, value)
    })
  }

  eventHander (node, vm, exp, dir) {
    let fn = vm.$options.methods && vm.$options.methods[exp]
    if (dir && fn) {
      node.addEventListenter(dir, fn.bind(vm), false)
    }
  }
  textUpdater (node, value) {
    node.textContent = value
  }
  htmlUpdater (node, value) {
    node.innerHTML =value
  }
  modelUpdater (node, value) {
    node.value = value
  }
}