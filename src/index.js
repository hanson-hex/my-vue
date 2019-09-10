const o = new MyVue({
  data: {
    text: '123',
    foo: {
      bar: '3345'
    }
  }
})
console.log(o.$data.text)
console.log('')