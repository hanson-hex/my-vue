import { MyVue } from './myVue'
const o = new MyVue({
  el: '#app',
  data: {
    text: '123',
    age: 12,
    name: 'hex',
    rawHtml: '<span style="color:red">利用vue添加了插入一个span 元素</span>',
    doubleAge: 23,
    foo: {
      bar: '3345'
    }
  },
  methods: {
    changeName () {
      this.name = 'new name'
    }
  }
})
// console.log(o.$data.text)
// o.$data.text = '353'
// console.log(o.$data.text)
